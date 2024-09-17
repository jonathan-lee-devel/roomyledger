import {TestBed} from '@automock/jest';

import {StripeController} from './stripe.controller';

describe('StripeController', () => {
  let controller: StripeController;

  beforeEach(async () => {
    const {unit} = TestBed.create(StripeController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
