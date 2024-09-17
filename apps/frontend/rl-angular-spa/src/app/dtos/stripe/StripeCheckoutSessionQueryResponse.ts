import {StripeCheckoutSessionQueryResponseStatus} from './StripeCheckoutSessionQueryResponseStatus';

export interface StripeCheckoutSessionQueryResponse {
  status: StripeCheckoutSessionQueryResponseStatus;
  trialEnd?: string;
}
