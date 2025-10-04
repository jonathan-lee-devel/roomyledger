import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';
import {FlagService} from 'zenigo-client-sdk';

import {UserAuthenticationStore} from '../+state/auth/user-auth.store';
import {FeatureFlagEnum} from '../enums/FeatureFlag.enum';

export const featureFlagGuard: CanActivateFn = (route) => {
  const userAuthenticationStore = inject(UserAuthenticationStore);
  const flagService = inject(FlagService);
  const featureFlagEnum = route.data['feature'] as FeatureFlagEnum;
  const isActive = flagService.flags()
      .find((featureFlag) => featureFlag.key === featureFlagEnum)
      ?.isEnabled ?? false;
  if (!isActive) {
    userAuthenticationStore.onLoginError(new Error('That feature has been disabled'));
    return false;
  }
  return true;
};
