import {HttpInterceptorFn} from '@angular/common/http';
import {inject, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {HttpStatus} from '../../../common/enums/HttpStatus';
import {RouterUtils} from '../../../util/router/Router.utils';

export const notFoundInterceptor: HttpInterceptorFn = (req, next) => {
  const ngZone = inject(NgZone);
  const router = inject(Router);

  return next(req).pipe(
      catchError((error) => {
        if (error.status === HttpStatus.NOT_FOUND) {
          RouterUtils.ngZoneRedirect(ngZone, router, rebaseRoutePath(RoutePath.ERROR_NOT_FOUND), false);
        }
        return throwError(() => error);
      }),
  );
};
