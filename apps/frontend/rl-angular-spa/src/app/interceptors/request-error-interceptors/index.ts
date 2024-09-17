import {badRequestInterceptor} from './bad-request/bad-request.interceptor';
import {conflictInterceptor} from './conflict/conflict.interceptor';
import {forbiddenInterceptor} from './forbidden/forbidden.interceptor';
import {internalServerErrorInterceptor} from './internal-server-error/internal-server-error.interceptor';
import {notFoundInterceptor} from './not-found/not-found.interceptor';
import {unauthorizedInterceptor} from './unauthorized/unauthorized.interceptor';

export const requestErrorInterceptors = [
  badRequestInterceptor,
  conflictInterceptor,
  forbiddenInterceptor,
  internalServerErrorInterceptor,
  notFoundInterceptor,
  unauthorizedInterceptor,
];
