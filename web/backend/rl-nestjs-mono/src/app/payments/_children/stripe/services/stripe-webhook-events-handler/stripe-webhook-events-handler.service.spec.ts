import {TestBed} from '@suites/unit';

import {StripeWebhookEventsHandlerService} from './stripe-webhook-events-handler.service';

describe('StripeWebhookEventsHandlerService', () => {
  let service: StripeWebhookEventsHandlerService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(
      StripeWebhookEventsHandlerService,
    ).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
