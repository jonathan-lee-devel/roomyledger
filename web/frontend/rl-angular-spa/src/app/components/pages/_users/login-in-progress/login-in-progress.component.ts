import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {delay, Subscription, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {RouterUtils} from '../../../../util/router/Router.utils';
import {SuccessCheckmarkComponent} from '../../../lib/success-checkmark/success-checkmark.component';

@Component({
  selector: 'app-login-in-progress',
  standalone: true,
  imports: [SuccessCheckmarkComponent, ProgressSpinnerModule],
  templateUrl: './login-in-progress.component.html',
  styleUrl: './login-in-progress.component.scss',
})
export class LoginInProgressComponent implements OnInit, OnDestroy {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userAuthenticationStore = inject(UserAuthenticationStore);
  private activatedRouteUrlSubscription?: Subscription;

  ngOnInit() {
    this.activatedRouteUrlSubscription = this.activatedRoute.url
        .pipe(
            delay(1000),
            tap(() => {
              if (this.userAuthenticationStore.loggedInState() === 'LOGGED_IN') {
                this.router
                    .navigate([rebaseRoutePath(RoutePath.LOGIN_SUCCESS)])
                    .catch(RouterUtils.navigateCatchErrorCallback);
              }
            }),
        )
        .subscribe();
  }

  ngOnDestroy() {
    this.activatedRouteUrlSubscription?.unsubscribe();
  }
}
