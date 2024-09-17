import Stripe from 'stripe';

export class StripeCustomerSubscriptionDeletedEvent {
  static readonly eventIdentifier = 'stripe.customer.subscription.deleted';
  constructor(
    public readonly stripeCustomerSubscriptionDeletedEvent: Stripe.CustomerSubscriptionDeletedEvent,
  ) {}
}
