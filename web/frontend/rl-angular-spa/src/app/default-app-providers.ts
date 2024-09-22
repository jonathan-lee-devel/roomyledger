import {DOCUMENT} from '@angular/common';
import {provideHttpClient, withFetch, withInterceptors} from '@angular/common/http';
import {APP_INITIALIZER} from '@angular/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material/snack-bar';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideRouter} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';

import {routes} from './app.routes';
import {extModules} from '../build-specifics';
import {initializeApp} from './init/app-initializer.factory';
import {authTokenInterceptor} from './interceptors/auth-token/auth-token.interceptor';
import {requestErrorInterceptors} from './interceptors/request-error-interceptors';

const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

export const DEFAULT_APP_PROVIDERS = [
  {
    provide: APP_INITIALIZER,
    useFactory: initializeApp,
    multi: true,
  },
  provideRouter(routes),
  provideHttpClient(
      withFetch(),
      withInterceptors([
        authTokenInterceptor,
        ...requestErrorInterceptors,
      ]),
  ),
  {provide: Document, useExisting: DOCUMENT},
  {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500}},
  provideAnimations(),
  provideMomentDateAdapter(MY_FORMATS),
  MessageService,
  DialogService,
  ConfirmationService,
  extModules,
];
