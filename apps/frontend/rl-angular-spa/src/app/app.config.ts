import {ApplicationConfig} from '@angular/core';

import {DEFAULT_APP_PROVIDERS} from './default-app-providers';

export const appConfig: ApplicationConfig = {
  providers: [...DEFAULT_APP_PROVIDERS],
};
