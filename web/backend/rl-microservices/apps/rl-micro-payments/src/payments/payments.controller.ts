import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import {
  GetPaymentStatusForEmailDto,
  GetPaymentStatusForUserIdDto,
  PaymentsServiceController,
  PaymentsServiceControllerMethods,
  PaymentsStatusDto,
} from '../../../../proto/payments';
import { Observable } from 'rxjs';

@Controller()
@PaymentsServiceControllerMethods()
export class PaymentsController implements PaymentsServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  // @GrpcMethod(PAYMENTS_SERVICE_NAME, 'GetPaymentStatusForUserId')
  getPaymentStatusForUserId(
    request: GetPaymentStatusForUserIdDto,
  ):
    | Promise<PaymentsStatusDto>
    | Observable<PaymentsStatusDto>
    | PaymentsStatusDto {
    return {
      id: request.id,
      email: 'test@example.com',
      status: 'Test',
    };
  }

  // @GrpcMethod(PAYMENTS_SERVICE_NAME, 'GetPaymentStatusForEmail')
  getPaymentStatusForEmail(
    request: GetPaymentStatusForEmailDto,
  ):
    | Promise<PaymentsStatusDto>
    | Observable<PaymentsStatusDto>
    | PaymentsStatusDto {
    return {
      id: '12345',
      email: request.email,
      status: 'Test',
    };
  }
}
