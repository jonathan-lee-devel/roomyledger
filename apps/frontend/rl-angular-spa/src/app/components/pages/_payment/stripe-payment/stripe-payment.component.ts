import {AsyncPipe, NgIf} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {delay, take, tap} from 'rxjs';

import {LoggedInState, UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {PaymentStore} from '../../../../+state/payment/payment.store';

@Component({
  selector: 'app-stripe-payment',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    NgIf,
    AsyncPipe,
  ],
  templateUrl: './stripe-payment.component.html',
  styleUrl: './stripe-payment.component.scss',
})
export class StripePaymentComponent implements OnInit {
  private readonly stipeCheckoutSessionIdQueryParam = 'stripe_checkout_id';
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly paymentStore = inject(PaymentStore);

  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    setTimeout(() => {
      this.route.queryParams
          .pipe(
              take(1),
              delay(1500),
              tap((queryParams) => {
                this.paymentStore.verifyStripeCheckoutSession(queryParams[this.stipeCheckoutSessionIdQueryParam]);
              }),
          )
          .subscribe();
    }, 2500);
  }

  getRedirectText(loggedInState: LoggedInState) {
    return (loggedInState === 'LOGGED_IN') ? 'Dashboard' : 'Login Page';
  }
}
