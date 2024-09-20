import {computed} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';

import {FeatureFlagDto} from '../../dtos/feature-flags/FeatureFlag.dto';
import {FeatureFlagEnum} from '../../enums/FeatureFlag.enum';

type FeatureFlagState = {
  featureFlags: FeatureFlagDto[];
  isLoading: boolean;
};

const initialState: FeatureFlagState = {
  featureFlags: [],
  isLoading: false,
};

export const FeatureFlagsStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      return {
        onFeatureFlagsInit: () => {
          patchState(store, {isLoading: true});
        },
        onFeatureFlagsLoaded: (featureFlags: FeatureFlagDto[]) => {
          patchState(store, {featureFlags: [...featureFlags], isLoading: false});
        },
      };
    }),
    withComputed((store) => {
      return {
        isUpdateOrMaintenanceInProgress: computed(
            () => store.featureFlags()
                .find((featureFlag) => featureFlag.featureName === FeatureFlagEnum.IS_UPDATE_OR_MAINTENANCE_IN_PROGRESS)?.isActive,
        ),
        isSignInWithGoogleEnabled: computed(
            () => store.featureFlags()
                .find((featureFlag) => featureFlag.featureName === FeatureFlagEnum.SIGN_IN_WITH_GOOGLE)?.isActive,
        ),
        isSignInWithAppleEnabled: computed(
            () => store.featureFlags()
                .find((featureFlag) => featureFlag.featureName === FeatureFlagEnum.SIGN_IN_WITH_APPLE)?.isActive,
        ),
        isSignInWithGitHubEnabled: computed(
            () => store.featureFlags()
                .find((featureFlag) => featureFlag.featureName === FeatureFlagEnum.SIGN_IN_WITH_GITHUB)?.isActive,
        ),
        isSignInWithEmailEnabled: computed(
            () => store.featureFlags()
                .find((featureFlag) => featureFlag.featureName === FeatureFlagEnum.SIGN_IN_WITH_EMAIL)?.isActive,
        ),
      };
    }),
);
