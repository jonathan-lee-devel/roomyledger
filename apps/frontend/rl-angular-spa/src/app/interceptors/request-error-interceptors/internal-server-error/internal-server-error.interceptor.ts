import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {HttpStatus} from '../../../common/enums/HttpStatus';
import {ToastWrapperService} from '../../../services/toast-wrapper/toast-wrapper.service';

export const internalServerErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const toastWrapperService = inject(ToastWrapperService);
  return next(req).pipe(
      catchError((error) => {
        if (error.status === HttpStatus.INTERNAL_SERVER_ERROR) {
          toastWrapperService.showToast(
              'Oops, something went wrong!',
              'A server error has occurred',
              false,
              true,
              'error',
              environment.TOAST_DURATION_MS,
          );
        }
        return throwError(() => error);
      }),
  );
};
