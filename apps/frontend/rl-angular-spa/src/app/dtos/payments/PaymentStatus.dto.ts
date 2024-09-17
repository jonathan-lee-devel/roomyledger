import {PaymentStatus} from '../../+state/payment/payment.store';

export interface PaymentStatusDto {
  status: PaymentStatus;
  trialEndDate: Date;
}
