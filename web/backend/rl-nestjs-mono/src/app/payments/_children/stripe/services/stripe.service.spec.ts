import {faker} from '@faker-js/faker';
import {ConfigService} from '@nestjs/config';
import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';
import Stripe from 'stripe';

import {StripeService} from './stripe.service';
import {EnvironmentVariables} from '../../../../../lib/config/environment';

xdescribe('StripeService', () => {
  let service: StripeService;
  let mockConfigService: Mocked<ConfigService<EnvironmentVariables>>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(StripeService).compile();
    service = unit;

    mockConfigService =
      unitRef.get<ConfigService<EnvironmentVariables>>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not throw exception when stripe payload passed in', async () => {
    const payload = {
      id: faker.string.uuid(),
      object: 'event',
    };
    const payloadString = JSON.stringify(payload, null, 2);
    const stripe = new Stripe(faker.string.sample(), {
      apiVersion: '2025-05-28.basil',
    });
    const header = stripe.webhooks.generateTestHeaderString({
      payload: payloadString,
      secret: mockConfigService.getOrThrow<string>('STRIPE_WEBHOOK_SECRET'),
    });

    let thrownError: any;
    try {
      await service.handleWebhookRequest(payloadString, header);
    } catch (err) {
      thrownError = err;
    }
    expect(thrownError).toBeUndefined();
  });
});
