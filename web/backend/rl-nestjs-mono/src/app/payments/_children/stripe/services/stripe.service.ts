import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { DateTime } from 'luxon';
import Stripe from 'stripe';

import { EnvironmentVariables } from '../../../../../config/environment';
import { PrismaService } from '../../../../../prisma/services/prisma.service';
import { StripeChargeSucceededEvent } from '../events/StripeChargeSucceeded.event';
import { StripeCustomerSubscriptionCreatedEvent } from '../events/StripeCustomerSubscriptionCreated.event';
import { StripeCustomerSubscriptionDeletedEvent } from '../events/StripeCustomerSubscriptionDeleted.event';

@Injectable()
export class StripeService {
  private readonly stripe: Stripe;

  constructor(
    private readonly logger: Logger,
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly eventEmitter: EventEmitter2,
    private readonly prismaService: PrismaService,
  ) {
    this.stripe = new Stripe(
      this.configService.getOrThrow<string>('STRIPE_API_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
  }

  async handleWebhookRequest(payload: any, stripeSignature: string) {
    try {
      const event = await this.stripe.webhooks.constructEventAsync(
        payload,
        stripeSignature,
        this.configService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET'),
      );

      this.logger.log(`Stripe webhook event type: ${event.type}`);

      switch (event.type) {
        case 'charge.succeeded':
          this.eventEmitter.emit(
            StripeChargeSucceededEvent.eventIdentifier,
            new StripeChargeSucceededEvent(event),
          );
          break;
        case 'customer.subscription.created':
          this.eventEmitter.emit(
            StripeCustomerSubscriptionCreatedEvent.eventIdentifier,
            new StripeCustomerSubscriptionCreatedEvent(event),
          );
          break;
        case 'customer.subscription.deleted':
          this.eventEmitter.emit(
            StripeCustomerSubscriptionDeletedEvent.eventIdentifier,
            new StripeCustomerSubscriptionDeletedEvent(event),
          );
          break;
      }
    } catch (err) {
      this.logger.error(err);
      throw new InternalServerErrorException();
    }
  }

  async getCustomerEmailFromStripeCustomerId(
    stripeCustomerId: string,
  ): Promise<string> {
    const customer = await this.stripe.customers.retrieve(stripeCustomerId);
    // @ts-expect-error Manual debug logging shows this field exists
    return customer?.email ?? 'undefined@stripe.com';
  }

  async cancelSubscriptionsForEmail(email: string) {
    const customersSubscriptions =
      await this.prismaService.stripeSubscription.findMany({where: {email}});
    for (const customersSubscription of customersSubscriptions) {
      await this.cancelSubscription(customersSubscription.stripeSubscriptionId);
    }
    await this.prismaService.stripeSubscription.updateMany({
      where: {email},
      data: {
        status: 'DELETED',
      },
    });
    this.logger.log(`Canceled subscriptions for email: ${email}`);
  }

  async verifyCheckoutSessionId(id: string) {
    const checkoutSession = await this.stripe.checkout.sessions.retrieve(id);
    const stripeSubscription = checkoutSession.subscription;
    let trialEnd: string | undefined = undefined;
    if (typeof stripeSubscription === 'string') {
      trialEnd = DateTime.fromMillis(
        (await this.stripe.subscriptions.retrieve(stripeSubscription))
          ?.trial_end * 1000,
      )
        .toJSDate()
        .toISOString();
    }
    return {
      status: checkoutSession.payment_status === 'paid' ? 'SUCCESS' : 'FAILURE',
      trialEnd,
    };
  }

  async getSubscriptionsForEmail(email: string) {
    return this.prismaService.stripeSubscription.findMany({where: {email}});
  }

  async getActiveSubscriptionsForEmail(email: string) {
    return this.prismaService.stripeSubscription.findMany({
      where: {email, status: 'CREATED'},
    });
  }

  async getTrialAndActiveSubscriptionsForEmail(email: string) {
    const activeSubscriptions =
      await this.prismaService.stripeSubscription.findMany({
        where: {email, status: 'CREATED'},
      });
    const trial = await this.isTrialActiveForEmail(email);
    return {
      activeSubscriptions,
      trial,
    };
  }

  private async cancelSubscription(stripeSubscriptionId: string) {
    try {
      await this.stripe.subscriptions.cancel(stripeSubscriptionId);
    } catch (err) {
      this.logger.error(`Error while canceling Stripe subscription: ${err}`);
    }
  }

  async isTrialActiveForEmail(
    email: string,
  ): Promise<{isTrialActive: boolean; trialEndDate?: string}> {
    const subscriptions = await this.prismaService.stripeSubscription.findMany({
      where: {email},
      orderBy: [{trialEndDate: 'asc'}],
    });
    if (!subscriptions || subscriptions?.length < 1) {
      return {isTrialActive: false};
    }
    return {
      isTrialActive:
        DateTime.fromJSDate(subscriptions?.[0].trialEndDate) >= DateTime.now(),
      trialEndDate: subscriptions?.[0]?.trialEndDate?.toISOString(),
    };
  }
}
