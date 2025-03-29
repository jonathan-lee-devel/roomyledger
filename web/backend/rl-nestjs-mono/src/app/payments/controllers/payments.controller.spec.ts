import {faker} from '@faker-js/faker';
import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';
import {AuthUser} from '@supabase/supabase-js';

import {PaymentsController} from './payments.controller';
import {PaymentsService} from '../services/payments.service';
import {PaymentStatus} from '../types/PaymentStatus.type';

describe('PaymentsController', () => {
  let controller: PaymentsController;
  let mockPaymentsService: Mocked<PaymentsService>;

  beforeEach(async () => {
    const {unit, unitRef} =
      await TestBed.solitary(PaymentsController).compile();
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
      customerEmail,
    );
  });
});
