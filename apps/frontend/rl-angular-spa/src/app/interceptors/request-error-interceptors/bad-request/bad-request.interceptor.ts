import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {catchError, throwError} from 'rxjs';

import {PropertiesStore} from '../../../+state/ledger/properties/properties.store';
import {HttpStatus} from '../../../common/enums/HttpStatus';
import {ToastWrapperService} from '../../../services/toast-wrapper/toast-wrapper.service';


export const badRequestInterceptor: HttpInterceptorFn = (req, next) => {
  const propertiesStore = inject(PropertiesStore);
  const toastWrapperService = inject(ToastWrapperService);

  return next(req).pipe(
      catchError((error) => {
        if (error.status === HttpStatus.BAD_REQUEST) {
          if (error?.error?.status) {
            let isError = false;
            let message: string;
            switch (error.error.status) {
              case 'INVALID_TOKEN':
                isError = true;
                message = 'An invalid token has been provided';
                break;
              case 'EMAIL_VERIFICATION_EXPIRED':
                isError = true;
                message =
                  'E-mail verification has expired, you will need to resubmit your request';
                break;
              case 'EMAIL_ALREADY_VERIFIED':
                message =
                  'E-mail verification has already been completed successfully, you may now login';
                break;
              default:
                isError = true;
                message = 'An unknown error-class has occurred';
            }
            if (!isError) {
              toastWrapperService.showConfirmMessage(
                  'Status',
                  message,
                  true,
                  true,
                  'info',
              );
            } else {
              toastWrapperService.showToast(
                  'Error',
                  message,
                  false,
                  true,
                  'error',
                  10_000,
              );
            }
          } else {
            let message: string;
            if (error?.error?.message) {
              message = error.error.message;
            } else if (error?.error?.errors && error?.error?.errors[0]?.msg) {
              message = JSON.stringify(error?.error?.errors[0]?.msg);
            } else if (error?.error?.error) {
              message = JSON.stringify(error?.error?.error);
            } else if (error?.error?.issues && error?.error?.issues?.length >= 1) {
              message = `${error.error.issues[0].path[0]}: ${JSON.stringify(error.error.issues[0].message)}`;
            } else {
              message = 'An unknown request error-class has occurred';
            }
            propertiesStore.clearProperties();
            toastWrapperService.showToast(
                'Request Error',
                message,
                false,
                true,
                'error',
                10_000,
            );
          }
        }
        return throwError(() => error);
      }),
  );
};
