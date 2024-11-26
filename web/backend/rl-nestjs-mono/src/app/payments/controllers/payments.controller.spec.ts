import {TestBed} from '@automock/jest';
import {faker} from '@faker-js/faker';
import {AuthUser} from '@supabase/supabase-js';

import {PaymentsController} from './payments.controller';
import {PaymentsService} from '../services/payments.service';
import {PaymentStatus} from '../types/PaymentStatus.type';

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

  it('should return customer payment status', async () => {
    const customerEmail = faker.internet.email();
    const currentUser = {email: customerEmail};
    const paymentStatus: PaymentStatus = 'PAID';

    mockPaymentsService.getCustomerPaymentStatus.mockResolvedValue({
      status: paymentStatus,
    });

    const result = await controller.getCustomerPaymentStatus(
      currentUser as AuthUser,
    );

    expect(result).toStrictEqual({
      status: paymentStatus,
    });
    expect(mockPaymentsService.getCustomerPaymentStatus).toHaveBeenCalledWith(
      customerEmail.toLowerCase(),
    );
  });
});
