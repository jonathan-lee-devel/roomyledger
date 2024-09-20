import {HttpInterceptorFn} from '@angular/common/http';
import {catchError, throwError} from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
      catchError((error) => {
        if (error.status === 0) {
          throw error;
        }
        return throwError(() => error);
      }),
  );
};
