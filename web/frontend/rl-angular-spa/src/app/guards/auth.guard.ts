import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

import {UserAuthenticationStore} from '../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../app.routes';
import {AuthService} from '../services/auth/auth.service';
import {RouterUtils} from '../util/router/Router.utils';

export const authGuard: CanActivateFn = (route) => {
  const userAuthenticationStore = inject(UserAuthenticationStore);
  const router = inject(Router);
  const authService = inject(AuthService);
  if (userAuthenticationStore.loggedInState() === 'LOGGED_IN') {
    return true;
  } else if (userAuthenticationStore.loggedInState() === 'INIT') {
    const userInfo = authService.getUserInfoFromLocalStorage();
    if (userInfo) {
      return true;
    }
  }
  router
      .navigate([rebaseRoutePath(RoutePath.LOGIN)], {
        queryParams: {
          next: RouterUtils.buildNextParam(route.url),
        },
      })
      .catch(RouterUtils.navigateCatchErrorCallback);
  return false;
};

