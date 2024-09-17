import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {catchError, throwError} from 'rxjs';

import {HttpStatus} from '../../../common/enums/HttpStatus';

export const conflictInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
      catchError((error) => {
        if (error.status === HttpStatus.CONFLICT) {
          snackBar.open('That entity already exists, cannot perform request');
        }
        return throwError(() => error);
      }),
  );
};
