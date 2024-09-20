import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {StripeCheckoutSessionQueryResponse} from '../../dtos/stripe/StripeCheckoutSessionQueryResponse';

@Injectable({
  providedIn: 'root',
})
export class StripeService {
  constructor(private readonly httpClient: HttpClient) { }

  verifyCheckoutSession(stripeCheckoutSessionId: string): Observable<StripeCheckoutSessionQueryResponse> {
    return this.httpClient.get<StripeCheckoutSessionQueryResponse>(`${environment.PAYMENTS_SERVICE_BASE_URL}/stripe/query-checkout-session/${stripeCheckoutSessionId}`);
  }
}
