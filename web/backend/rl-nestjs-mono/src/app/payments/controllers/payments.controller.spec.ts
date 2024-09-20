import {TestBed} from '@automock/jest';

import {PaymentsController} from './payments.controller';
import {PaymentsService} from '../services/payments.service';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let mockPaymentsService: jest.Mocked<PaymentsService>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(PaymentsController).compile();
    controller = unit;

    mockPaymentsService = unitRef.get<PaymentsService>(PaymentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockPaymentsService).toBeDefined();
  });
});
