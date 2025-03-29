import {computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import flagsmith from 'flagsmith';
import {HTMLLinkElement} from 'happy-dom';
import {take} from 'rxjs';

import {environment} from '../../../environments/environment';
import {rebaseRoutePath, RoutePath} from '../../app.routes';
import {TokensDto} from '../../dtos/auth/TokensDto';
import {UserProfile} from '../../dtos/auth/UserProfile';
import {AuthService} from '../../services/auth/auth.service';
import {SupabaseService} from '../../services/supabase/supabase.service';
import {ToastWrapperService} from '../../services/toast-wrapper/toast-wrapper.service';
import {RouterUtils} from '../../util/router/Router.utils';
import {PropertiesStore} from '../ledger/properties/properties.store';
import {NotificationsStore} from '../notifications/notifications.store';

export type LoggedInState = 'INIT' | 'NOT_LOGGED_IN' | 'LOADING' | 'LOGGED_IN';

type UserAuthenticationState = {
  loggedInState: LoggedInState;
  tokens: TokensDto;
  userInfo: UserProfile;
  isDarkMode: boolean;
};

const initialState: UserAuthenticationState = {
  loggedInState: 'INIT',
  tokens: {accessToken: '', refreshToken: ''},
  userInfo: {
    email: '',
    displayName: '',
  },
  isDarkMode: false,
};

export const UserAuthenticationStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const authService = inject(AuthService);
      const router = inject(Router);
      const notificationsStore = inject(NotificationsStore);
      const propertiesStore = inject(PropertiesStore);
      const document = inject(Document);
      const supabaseService = inject(SupabaseService);
      return {
        setDarkModeEnabled: () => {
          const linkElement = document.getElementById(
              'app-theme',
          ) as unknown as HTMLLinkElement;
          linkElement.href = 'theme-dark.css';
          authService.setDarkModeSettingInLocalStorage(true);
          patchState(store, {isDarkMode: true});
        },
        setLightModeEnabled: () => {
          const linkElement = document.getElementById(
              'app-theme',
          ) as unknown as HTMLLinkElement;
          linkElement.href = 'theme-light.css';
          authService.setDarkModeSettingInLocalStorage(false);
          patchState(store, {isDarkMode: false});
        },
        onLoginComplete: async (
            tokens: {accessToken: string; refreshToken: string},
            userInfo: UserProfile,
        ) => {
          authService.setTokensInLocalStorage(tokens);
          authService.setUserInfoInLocalStorage(userInfo);
          await flagsmith.identify(userInfo.email);
          const next = authService.getNextParamFromLocalStorageAndNoReset();
          if (next) {
            router
                .navigateByUrl(next)
                .catch(RouterUtils.navigateCatchErrorCallback);
          }
          patchState(store, {loggedInState: 'LOGGED_IN', tokens, userInfo});
        },
        userCheckIn: () => {
          authService
              .checkIn({
                email: supabaseService.session?.user?.email ?? '',
                displayName: supabaseService.session?.user?.user_metadata['name'],
              })
              .pipe(take(1))
              .subscribe();
        },
        logout: async () => {
          router
              .navigate([rebaseRoutePath(RoutePath.LOGOUT_IN_PROGRESS)])
              .catch(RouterUtils.navigateCatchErrorCallback);
          patchState(store, {loggedInState: 'LOADING'});
          await supabaseService.signOut();
          authService.setNextParamInLocalStorageIfNotAnonymous(null);
          authService.clearUserDataAndTokens();
          authService.redirectIfNotAnonymous();
          patchState(store, {...initialState});
          router
              .navigate([rebaseRoutePath(RoutePath.LOGIN)])
              .catch(RouterUtils.navigateCatchErrorCallback);
          notificationsStore.unloadNotifications();
          propertiesStore.clearProperties();
        },
      };
    }),
    withMethods((store) => {
      return {
        onLoginError: (error: Error) => {
          console.error(error);
          store.logout().catch((reason) => console.error(reason));
        },
      };
    }),
    withMethods((store) => {
      const authService = inject(AuthService);
      const toastWrapperService = inject(ToastWrapperService);
      const supabaseService = inject(SupabaseService);
      const router = inject(Router);
      return {
        attemptSupabaseSignUpWithEmail: async (
            email: string,
            password: string,
        ) => {
          patchState(store, {loggedInState: 'LOADING'});
          const {error} = await supabaseService.signUpWithEmail(email, password);
          if (error) {
            store.onLoginError(error);
          } else {
            patchState(store, {loggedInState: 'NOT_LOGGED_IN'});
            toastWrapperService.showConfirmMessage(
                'Login',
                'Check your e-mail for further instructions',
                true,
                true,
                'info',
                environment.TOAST_DURATION_MS,
            );
          }
        },
        attemptSupabaseLoginWithEmail: async (
            email: string,
            password: string,
        ) => {
          patchState(store, {loggedInState: 'LOADING'});
          const {error} = await supabaseService.signInWithEmail(email, password);
          if (error) {
            toastWrapperService.showToast(
                'Invalid Credentials',
                'Looks like there was an error logging in',
                false,
                true,
                'error',
            );
            store.onLoginError(error);
          } else {
            router
                .navigate([rebaseRoutePath(RoutePath.LOGIN_IN_PROGRESS)])
                .catch(RouterUtils.navigateCatchErrorCallback);
          }
        },
        attemptSupabaseLoginWithGoogle: async () => {
          patchState(store, {loggedInState: 'LOADING'});
          const {error} = await supabaseService.signInWithGoogle();
          if (error) {
            store.onLoginError(error);
          } else {
            router
                .navigate([rebaseRoutePath(RoutePath.LOGIN_IN_PROGRESS)])
                .catch(RouterUtils.navigateCatchErrorCallback);
          }
        },
        attemptSupabaseLoginWithGitHub: async () => {
          patchState(store, {loggedInState: 'LOADING'});
          const {error} = await supabaseService.signInWithGitHub();
          if (error) {
            store.onLoginError(error);
          } else {
            router
                .navigate([rebaseRoutePath(RoutePath.LOGIN_IN_PROGRESS)])
                .catch(RouterUtils.navigateCatchErrorCallback);
          }
        },
        checkLoginOnRefresh: () => {
          const {accessToken, refreshToken} =
          authService.getTokensFromLocalStorage();
          const userInfo = authService.getUserInfoFromLocalStorage();
          if (accessToken !== '' && refreshToken !== '' && userInfo) {
            store
                .onLoginComplete({accessToken: accessToken, refreshToken}, userInfo)
                .catch((reason) => console.error(reason));
          }
        },
        onLoginPageVisitedWithNext: (next: string) => {
          authService.setNextParamInLocalStorageIfNotAnonymous(next);
          toastWrapperService.showToast(
              'Requires User Login',
              'You must be logged in to view that resource, log in now and you will be redirected automatically',
              false,
              true,
              'warn',
              10_000,
          );
        },
      };
    }),
    withComputed((store) => {
      return {
        currentAccessToken: computed(() => store.tokens().accessToken),
        currentUserEmail: computed(() => store.userInfo().email),
        currentUserId: computed(() => 'ba310337-7a8b-4c92-97ca-54b59f40b70a'),
      };
    }),
    withHooks({
      onInit: (store) => {
        if (
          !localStorage.getItem(AuthService.darkModeKey) &&
        window?.matchMedia('(prefers-color-scheme: dark)')?.matches
        ) {
          store.setDarkModeEnabled();
        } else if (
          JSON.parse(localStorage.getItem(AuthService.darkModeKey) ?? 'false')
        ) {
          store.setDarkModeEnabled();
        } else {
          store.setLightModeEnabled();
        }
      },
    }),
);
