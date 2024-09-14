import Stripe from 'stripe';

export class StripeCustomerSubscriptionCreatedEvent {
  static readonly eventIdentifier = 'stripe.customer.subscription.created';
  constructor(
    public readonly stripeCustomerSubscriptionCreatedEvent: Stripe.CustomerSubscriptionCreatedEvent,
  ) {}
}
