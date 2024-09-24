import {Controller} from '@nestjs/common';
import {paymentsProto} from '@rl-gw';
import {Observable} from 'rxjs';

import {PaymentsService} from '../services/payments.service';

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
    return this.paymentsService.getCustomerPaymentStatusByUserId(request.id);
  }

  getPaymentStatusForEmail(
    request: paymentsProto.GetPaymentStatusForEmailDto,
  ):
    | Promise<paymentsProto.PaymentsStatusDto>
    | Observable<paymentsProto.PaymentsStatusDto>
    | paymentsProto.PaymentsStatusDto {
    return this.paymentsService.getCustomerPaymentStatus(request.email);
  }
}
