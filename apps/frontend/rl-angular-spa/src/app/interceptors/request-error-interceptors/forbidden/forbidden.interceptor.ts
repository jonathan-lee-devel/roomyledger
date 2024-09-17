import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, throwError} from 'rxjs';

import {HttpStatus} from '../../../common/enums/HttpStatus';

export const forbiddenInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  return next(req).pipe(catchError((error) => {
    if (error.status === HttpStatus.FORBIDDEN) {
      snackBar.open('Access to that resource or action is denied');
    }
    return throwError(() => error);
  }));
};
