import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {HttpStatus} from '../../../common/enums/HttpStatus';


export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuthenticationStore = inject(UserAuthenticationStore);

  return next(req).pipe(
      catchError((error) => {
        if (error.status === HttpStatus.UNAUTHORIZED) {
          userAuthenticationStore.onLoginError(error);
        }
        return throwError(() => error);
      }),
  );
};
