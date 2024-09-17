import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {delay, take, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {RouterUtils} from '../../../../util/router/Router.utils';
import {SuccessCheckmarkComponent} from '../../../lib/success-checkmark/success-checkmark.component';

@Component({
  selector: 'app-login-success',
  standalone: true,
  imports: [SuccessCheckmarkComponent],
  templateUrl: './login-success.component.html',
  styleUrl: './login-success.component.scss',
})
export class LoginSuccessComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly userAuthenticationStore = inject(UserAuthenticationStore);

  ngOnInit() {
    this.activatedRoute.url
        .pipe(
            take(1),
            delay(2500),
            tap(() => {
              if (this.userAuthenticationStore.loggedInState() === 'LOGGED_IN') {
                this.router
                    .navigate([rebaseRoutePath(RoutePath.MAIN_MENU)])
                    .catch(RouterUtils.navigateCatchErrorCallback);
              }
            }),
        )
        .subscribe();
  }
}
