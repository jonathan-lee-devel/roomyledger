import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';

import {AuthService} from '../../services/auth/auth.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  if (
    (/(https):\/\/(.*).roomyledger.com/.test(req.url) ||
      /(http):\/\/localhost:3000/.test(req.url))) {
    return next(req.clone({
      withCredentials: true,
      setHeaders: {
        'Authorization': `Bearer ${authService.getTokensFromLocalStorage().accessToken}`,
      }}));
  }

  return next(req);
};
