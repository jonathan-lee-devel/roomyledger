import {Injectable, Logger} from '@nestjs/common';

import {StripeService} from '../../stripe/services/stripe.service';
import {PaymentStatus} from '../types/PaymentStatus.type';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly logger: Logger,
    private readonly stripeService: StripeService,
  ) {}

  async getCustomerPaymentStatus(
    requestingUserEmail: string,
  ): Promise<{status: PaymentStatus; trialEndDate?: string}> {
    this.logger.log(
      `Request to get customer <${requestingUserEmail}> payment status`,
    );
    const activeSubscriptions =
      await this.stripeService.getActiveSubscriptionsForEmail(
        requestingUserEmail,
      );
    const {isTrialActive, trialEndDate} =
      await this.stripeService.isTrialActiveForEmail(requestingUserEmail);
    if (isTrialActive) {
      return {status: 'TRIAL', trialEndDate};
    }
    if (!activeSubscriptions || activeSubscriptions?.length < 1) {
      return {status: 'UNPAID'};
    }
    return {status: 'PAID'};
  }

  async getCustomerPaymentStatusByUserId(
    userId: string,
  ): Promise<{status: PaymentStatus; trialEndDate?: string}> {
    this.logger.log(`Request to get customer <${userId}> payment status`);
    return {status: 'UNPAID'};
  }
}
