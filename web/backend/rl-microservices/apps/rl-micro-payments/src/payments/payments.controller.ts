import {Controller} from '@nestjs/common';
import {paymentsProto} from '@rl-gw';
import {Observable} from 'rxjs';

import {PaymentsService} from './payments.service';

@Controller()
@paymentsProto.PaymentsServiceControllerMethods()
export class PaymentsController
  implements paymentsProto.PaymentsServiceController
{
  constructor(private readonly paymentsService: PaymentsService) {}

  getPaymentStatusForUserId(
    request: paymentsProto.GetPaymentStatusForUserIdDto,
  ):
    | Promise<paymentsProto.PaymentsStatusDto>
    | Observable<paymentsProto.PaymentsStatusDto>
    | paymentsProto.PaymentsStatusDto {
    return {
      id: request.id,
      email: 'test@example.com',
      status: 'Test',
    };
  }

  getPaymentStatusForEmail(
    request: paymentsProto.GetPaymentStatusForEmailDto,
  ):
    | Promise<paymentsProto.PaymentsStatusDto>
    | Observable<paymentsProto.PaymentsStatusDto>
    | paymentsProto.PaymentsStatusDto {
    return {
      id: '12345',
      email: request.email,
      status: 'Test',
    };
  }
}
