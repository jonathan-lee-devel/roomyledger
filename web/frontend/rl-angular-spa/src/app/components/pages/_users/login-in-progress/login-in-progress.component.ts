import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {interval, Subscription, take, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {RouterUtils} from '../../../../util/router/Router.utils';

@Component({
  selector: 'app-login-in-progress',
  standalone: true,
  imports: [ProgressSpinnerModule],
  templateUrl: './login-in-progress.component.html',
  styleUrl: './login-in-progress.component.scss',
})
export class LoginInProgressComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly userAuthenticationStore = inject(UserAuthenticationStore);
  private intervalSubscription?: Subscription;

  ngOnInit() {
    this.intervalSubscription = interval(500)
        .pipe(
            take(20),
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
    this.intervalSubscription?.unsubscribe();
  }
}
