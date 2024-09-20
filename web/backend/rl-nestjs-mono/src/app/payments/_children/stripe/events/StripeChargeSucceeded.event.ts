import Stripe from 'stripe';

export class StripeChargeSucceededEvent {
  static readonly eventIdentifier = 'stripe.charge.succeeded';
  constructor(
    public readonly stipeChargeSucceededEvent: Stripe.ChargeSucceededEvent,
  ) {}
}
