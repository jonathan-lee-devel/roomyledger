import {inject} from '@angular/core';
import {CanActivateFn} from '@angular/router';

import {UserAuthenticationStore} from '../+state/auth/user-auth.store';
import {FeatureFlagsStore} from '../+state/feature-flags/feature-flags.store';
import {FeatureFlagEnum} from '../enums/FeatureFlag.enum';

export const featureFlagGuard: CanActivateFn = (route) => {
  const userAuthenticationStore = inject(UserAuthenticationStore);
  const featureFlagsStore = inject(FeatureFlagsStore);
  const featureFlagEnum = route.data['feature'] as FeatureFlagEnum;
  const isActive = featureFlagsStore.featureFlags()
      .find((featureFlag) => featureFlag.featureName === featureFlagEnum)
      ?.isActive;
  if (!isActive) {
    userAuthenticationStore.onLoginError(new Error('That feature has been disabled'));
    return false;
  }
  return true;
};
