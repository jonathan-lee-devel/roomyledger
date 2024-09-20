import {computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {take, tap} from 'rxjs';

import {rebaseRoutePath, RoutePath} from '../../app.routes';
import {TrialAndSubscriptionsForUserDto} from '../../dtos/payments/TrialAndSubscriptionsForUser.dto';
import {PaymentsService} from '../../services/payments/payments.service';
import {StripeService} from '../../services/stripe/stripe.service';
import {ToastWrapperService} from '../../services/toast-wrapper/toast-wrapper.service';
import {RouterUtils} from '../../util/router/Router.utils';

export type FreeTrialState = 'ACTIVE' | 'INACTIVE';

export type PaymentStatus = 'PAID' | 'UNPAID' | 'TRIAL';

type PaymentState = {
  stripeCheckoutSessionId: string;
  trialEndDate: string;
  paymentStatus: PaymentStatus;
  subscriptions: TrialAndSubscriptionsForUserDto;
  isLoading: boolean;
}

const initialState: PaymentState = {
  stripeCheckoutSessionId: '',
  trialEndDate: new Date().toISOString(),
  paymentStatus: 'UNPAID',
  subscriptions: {
    trial: {
      isTrialActive: false,
      trialEndDate: new Date(),
    },
    activeSubscriptions: [],
  },
  isLoading: false,
};

export const PaymentStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const stripeService = inject(StripeService);
      const router = inject(Router);
      const toastWrapperService = inject(ToastWrapperService);
      const paymentsService = inject(PaymentsService);
      return {
        verifyStripeCheckoutSession: (stripeCheckoutSessionId: string) => {
          patchState(store, {stripeCheckoutSessionId});
          stripeService.verifyCheckoutSession(stripeCheckoutSessionId).pipe(
              take(1),
              tap((stripeCheckoutSessionQueryResponse) => {
                let toastSummary = '';
                let toastMessage = '';
                let toastSeverity = 'info';
                if (stripeCheckoutSessionQueryResponse.status === 'SUCCESS') {
                  toastSummary = (stripeCheckoutSessionQueryResponse.trialEnd) ?
                  'Trial Successfully Started' :
                  'Purchase Successful';
                  patchState(store, {
                    trialEndDate: new Date(stripeCheckoutSessionQueryResponse.trialEnd ?? '').toISOString(),
                    paymentStatus: (stripeCheckoutSessionQueryResponse.trialEnd) ? 'TRIAL' : 'PAID',
                  });
                  toastMessage = (stripeCheckoutSessionQueryResponse.trialEnd) ?
                  'Thank you for trying out our product!' :
                  'Thank you for your purchase!';
                  router.navigate([rebaseRoutePath(RoutePath.MAIN_MENU)])
                      .catch(RouterUtils.navigateCatchErrorCallback);
                } else if (stripeCheckoutSessionQueryResponse.status === 'FAILURE') {
                  toastSummary = 'Oops! Something Went Wrong';
                  toastMessage = 'Please contact support using the contact links in the footer';
                  toastSeverity = 'error';
                  patchState(store, {paymentStatus: 'UNPAID'});
                  router.navigate([rebaseRoutePath(RoutePath.ERROR_NOT_FOUND)])
                      .catch(RouterUtils.navigateCatchErrorCallback);
                }
                toastWrapperService.showToast(toastSummary,
                    toastMessage,
                    true,
                    true,
                    toastSeverity,
                );
              }),
          ).subscribe();
        },
        loadPaymentStatus: () => {
          paymentsService.getPaymentStatusForLoggedInCustomer().pipe(
              take(1),
              tap(({status, trialEndDate}) => {
                patchState(store, {paymentStatus: status, trialEndDate});
              }),
          ).subscribe();
        },
        loadActiveSubscriptions: () => {
          patchState(store, {isLoading: true});
          paymentsService.getActiveSubscriptionsForLoggedInCustomer().pipe(
              take(1),
              tap((subscriptions) => {
                patchState(store, {subscriptions, isLoading: false});
              }),
          ).subscribe();
        },
        cancelSubscriptions: () => {
          paymentsService.cancelSubscriptions().pipe(
              take(1),
              tap(() => {
                patchState(store, {subscriptions: {activeSubscriptions: [], trial: {trialEndDate: new Date(), isTrialActive: false}}});
                toastWrapperService.showToast('Subscriptions Cancelled', 'Your subscriptions have been cancelled successfully!', false, true, 'success');
              }),
          ).subscribe();
        },
      };
    }),
    withComputed((store) => {
      return {
        daysRemainingInFreeTrial: computed(() => {
          const transformedTrialEndDate = new Date(store.trialEndDate());
          const currentDate = new Date();
          const difference = currentDate.valueOf() - transformedTrialEndDate.valueOf();
          return (difference < 0) ?
          String(Math.abs(Math.ceil(difference / (1000 * 3600 * 24)))) : '0';
        }),
      };
    }),
);
