import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';

import {UserAuthenticationStore} from '../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../app.routes';
import {RouterUtils} from '../util/router/Router.utils';

export const reverseAuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const userAuthenticationStore = inject(UserAuthenticationStore);
  if (userAuthenticationStore.loggedInState() === 'LOGGED_IN') {
    router
        .navigate([rebaseRoutePath(RoutePath.MAIN_MENU)])
        .catch(RouterUtils.navigateCatchErrorCallback);
    return false;
  }
  return true;
};
