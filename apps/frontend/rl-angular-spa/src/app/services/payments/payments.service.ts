import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {PaymentStatus} from '../../+state/payment/payment.store';
import {environment} from '../../../environments/environment';
import {TrialAndSubscriptionsForUserDto} from '../../dtos/payments/TrialAndSubscriptionsForUser.dto';

@Injectable({
  providedIn: 'root',
})
export class PaymentsService {
  constructor(private readonly httpClient: HttpClient) {}

  getPaymentStatusForLoggedInCustomer(): Observable<{
    status: PaymentStatus;
    trialEndDate?: string;
  }> {
    return this.httpClient.get<{status: PaymentStatus; trialEndDate?: string}>(
        `${environment.PAYMENTS_SERVICE_BASE_URL}/customer-status`,
    );
  }

  getActiveSubscriptionsForLoggedInCustomer() {
    return this.httpClient.get<TrialAndSubscriptionsForUserDto>(
        `${environment.PAYMENTS_SERVICE_BASE_URL}/stripe/subscriptions/for-user`,
    );
  }

  cancelSubscriptions() {
    return this.httpClient.patch<unknown>(
        `${environment.PAYMENTS_SERVICE_BASE_URL}/stripe/controls/cancel-subscription`,
        {},
    );
  }
}
