import {TestBed} from '@suites/unit';

import {StripeController} from './stripe.controller';

describe('StripeController', () => {
  let controller: StripeController;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(StripeController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
