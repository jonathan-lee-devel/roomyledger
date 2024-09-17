import {TestBed} from '@automock/jest';

import {StripeWebhookEventsHandlerService} from './stripe-webhook-events-handler.service';

describe('StripeWebhookEventsHandlerService', () => {
  let service: StripeWebhookEventsHandlerService;

  beforeEach(async () => {
    const {unit} = TestBed.create(StripeWebhookEventsHandlerService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
