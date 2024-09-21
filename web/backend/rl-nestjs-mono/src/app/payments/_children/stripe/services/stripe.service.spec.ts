import {TestBed} from '@automock/jest';
import {faker} from '@faker-js/faker';
import {ConfigService} from '@nestjs/config';
import Stripe from 'stripe';

import {StripeService} from './stripe.service';
import {EnvironmentVariables} from '../../../../../config/environment';

describe('StripeService', () => {
  let service: StripeService;
  let mockConfigService: jest.Mocked<ConfigService<EnvironmentVariables>>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(StripeService).compile();
    service = unit;

    mockConfigService =
      unitRef.get<ConfigService<EnvironmentVariables>>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should not throw exception when stripe payload passed in', async () => {
    const configSecret = faker.string.sample();
    mockConfigService.getOrThrow.mockImplementation(() => configSecret);
    const payload = {
      id: faker.string.uuid(),
      object: 'event',
    };
    const payloadString = JSON.stringify(payload, null, 2);
    const stripe = new Stripe(
      mockConfigService.getOrThrow<string>('STRIPE_API_KEY'),
      {
        apiVersion: '2024-06-20',
      },
    );
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
