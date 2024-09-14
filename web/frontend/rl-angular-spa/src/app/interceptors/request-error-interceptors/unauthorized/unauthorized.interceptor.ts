import {HttpInterceptorFn} from '@angular/common/http';
import {inject, NgZone} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';
import {catchError, throwError} from 'rxjs';

import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {HttpStatus} from '../../../common/enums/HttpStatus';
import {RouterUtils} from '../../../util/router/Router.utils';


export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const ngZone = inject(NgZone);
  const router = inject(Router);

  return next(req).pipe(
      catchError((error) => {
        if (error.status === HttpStatus.UNAUTHORIZED) {
          RouterUtils.ngZoneRedirect(ngZone, router, rebaseRoutePath(RoutePath.LOGIN), false);
          snackBar.open('Invalid login credentials');
          return throwError(() => error);
        }
        return throwError(() => error);
      }),
  );
};
