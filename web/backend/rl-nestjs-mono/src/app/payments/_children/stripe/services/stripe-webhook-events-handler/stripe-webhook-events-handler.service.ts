import {Injectable, Logger} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {DateTime} from 'luxon';

import {PrismaService} from '../../../../../../lib/prisma/services/prisma.service';
import {StripeChargeSucceededEvent} from '../../events/StripeChargeSucceeded.event';
import {StripeCustomerSubscriptionCreatedEvent} from '../../events/StripeCustomerSubscriptionCreated.event';
import {StripeCustomerSubscriptionDeletedEvent} from '../../events/StripeCustomerSubscriptionDeleted.event';
import {StripeService} from '../stripe.service';

@Injectable()
export class StripeWebhookEventsHandlerService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly stripeService: StripeService,
  ) {}

  @OnEvent(StripeChargeSucceededEvent.eventIdentifier, {async: true})
  async handleStripeChargeSucceededEvent(event: StripeChargeSucceededEvent) {
    this.logger.log(
      `On -> ${StripeChargeSucceededEvent.eventIdentifier}: ${event.stipeChargeSucceededEvent?.id}`,
    );
  }

  @OnEvent(StripeCustomerSubscriptionCreatedEvent.eventIdentifier, {
    async: true,
  })
  async handleStripeCustomerSubscriptionCreatedEvent(
    event: StripeCustomerSubscriptionCreatedEvent,
  ) {
    this.logger.log(
      `On -> ${StripeCustomerSubscriptionCreatedEvent.eventIdentifier}: ${event.stripeCustomerSubscriptionCreatedEvent?.id}`,
    );
    const customer =
      event.stripeCustomerSubscriptionCreatedEvent.data.object.customer;
    let customerId: string;
    if (typeof customer === 'string') {
      customerId = customer;
    } else {
      customerId = customer.id;
    }
    const trialEnd = DateTime.fromMillis(
      event.stripeCustomerSubscriptionCreatedEvent.data.object.trial_end * 1000,
    ).toJSDate();
    const stripeCustomerEmail =
      await this.stripeService.getCustomerEmailFromStripeCustomerId(customerId);

    const stripeSubscription =
      await this.prismaService.stripeSubscription.create({
        data: {
          stripeCustomerId: customerId,
          stripeSubscriptionId:
            event.stripeCustomerSubscriptionCreatedEvent.data.object.id,
          trialEndDate: trialEnd,
          email: stripeCustomerEmail,
          status: 'CREATED',
        },
      });

    this.logger.log(
      `Created stripe subscription with ID: ${stripeSubscription.id}`,
    );
  }

  @OnEvent(StripeCustomerSubscriptionCreatedEvent.eventIdentifier, {
    async: true,
  })
  async handleStripeCustomerSubscriptionDeletedEvent(
    event: StripeCustomerSubscriptionDeletedEvent,
  ) {
    this.logger.log(
      `On -> ${StripeCustomerSubscriptionDeletedEvent.eventIdentifier}: ${event.stripeCustomerSubscriptionDeletedEvent?.id}`,
    );
    const customer =
      event.stripeCustomerSubscriptionDeletedEvent.data.object.customer;
    let customerId: string;
    if (typeof customer === 'string') {
      customerId = customer;
    } else {
      customerId = customer.id;
    }
    const stripeCustomerEmail =
      await this.stripeService.getCustomerEmailFromStripeCustomerId(customerId);

    const stripeSubscription =
      await this.prismaService.stripeSubscription.updateMany({
        where: {
          email: stripeCustomerEmail,
        },
        data: {
          status: 'DELETED',
        },
      });

    this.logger.log(
      `Set status deleted for stripe subscriptions with count: ${stripeSubscription.count}`,
    );
  }
}
