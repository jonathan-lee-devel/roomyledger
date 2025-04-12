import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {watchState} from '@ngrx/signals';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
export class LoginInProgressComponent {
  private readonly router = inject(Router);
  private readonly userAuthenticationStore = inject(UserAuthenticationStore);

  constructor() {
    watchState(this.userAuthenticationStore, (state) => {
      if (state.loggedInState === 'LOGGED_IN') {
        this.router
            .navigate([rebaseRoutePath(RoutePath.LOGIN_SUCCESS)])
            .catch(RouterUtils.navigateCatchErrorCallback);
      }
    });
  }
}
