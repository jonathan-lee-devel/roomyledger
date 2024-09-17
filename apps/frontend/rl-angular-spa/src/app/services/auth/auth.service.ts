import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {environment} from '../../../environments/environment';
import {
  rebaseRoutePath,
  rebaseRoutePathAsString,
  RoutePath,
} from '../../app.routes';
import {TokensDto} from '../../dtos/auth/TokensDto';
import {UserProfile} from '../../dtos/auth/UserProfile';
import {RouterUtils} from '../../util/router/Router.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  static readonly darkModeKey = 'dark-mode';
  static readonly userDataKey = 'user-data';
  static readonly accessTokenKey = 'access-token';
  static readonly refreshTokenKey = 'refresh-token';
  static readonly nextParam = 'next';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {}

  checkIn(userInfo: UserProfile) {
    return this.httpClient.post<{isAcknowledged: boolean}>(
        `${environment.USERS_SERVICE_BASE_URL}/authenticated/check-in`,
        userInfo,
    );
  }

  public redirectIfNotAnonymous() {
    if (
      this.router.url !== '/' &&
      this.router.url !== rebaseRoutePath(RoutePath.RESET_PASSWORD) &&
      !this.router.url.startsWith(
          rebaseRoutePathAsString(RoutePath.STRIPE_PAYMENT),
      ) &&
      !this.router.url.startsWith(
          rebaseRoutePathAsString(
              RoutePath.RESET_PASSWORD_CONFIRM.replace(':tokenValue', ''),
          ),
      ) &&
      !this.router.url.startsWith(
          rebaseRoutePathAsString(
              RoutePath.REGISTER_CONFIRM.replace(':tokenValue', ''),
          ),
      ) &&
      !/^.*\/properties\/[a-zA-Z0-9]+\/invitations\/accept\/[a-zA-Z0-9]+.*$/.exec(
          this.router.url,
      )
    ) {
      // Don't redirect to login page on anonymous pages (first-time visit etc.)
      this.router
          .navigate([rebaseRoutePath(RoutePath.LOGIN)])
          .catch(RouterUtils.navigateCatchErrorCallback);
    }
  }

  public clearUserDataAndTokens() {
    localStorage.removeItem(AuthService.userDataKey);
    localStorage.removeItem(AuthService.accessTokenKey);
    localStorage.removeItem(AuthService.refreshTokenKey);
  }

  public getTokensFromLocalStorage(): TokensDto {
    const accessToken = localStorage.getItem(AuthService.accessTokenKey);
    const refreshToken = localStorage.getItem(AuthService.refreshTokenKey);
    return accessToken && refreshToken ?
      {accessToken: accessToken, refreshToken} :
      {accessToken: '', refreshToken: ''};
  }

  // TODO: use profile DTO
  public getUserInfoFromLocalStorage() {
    const userInfo = localStorage.getItem(AuthService.userDataKey);
    return userInfo ? (JSON.parse(userInfo) as UserProfile) : null;
  }

  public setTokensInLocalStorage(tokens: TokensDto) {
    localStorage.setItem(AuthService.accessTokenKey, tokens.accessToken);
    localStorage.setItem(AuthService.refreshTokenKey, tokens.refreshToken);
  }

  public setUserInfoInLocalStorage(userInfo: UserProfile) {
    localStorage.setItem(AuthService.userDataKey, JSON.stringify(userInfo));
  }

  public getNextParamFromLocalStorageAndNoReset() {
    return localStorage.getItem(AuthService.nextParam);
  }

  public getNextParamFromLocalStorageAndReset() {
    const next = localStorage.getItem(AuthService.nextParam);
    localStorage.removeItem(AuthService.nextParam);
    return next;
  }

  public setNextParamInLocalStorageIfNotAnonymous(next: string | null) {
    if (
      next?.startsWith('/#') ||
      next === rebaseRoutePath(RoutePath.LANDING_PAGE)
    ) {
      return;
    }
    if (
      next &&
      next !== '/' &&
      next !== rebaseRoutePath(RoutePath.MAIN_MENU) &&
      next !== rebaseRoutePath(RoutePath.LOGIN)
    ) {
      localStorage.setItem(AuthService.nextParam, next);
    } else {
      localStorage.setItem(
          AuthService.nextParam,
          rebaseRoutePath(RoutePath.MAIN_MENU),
      );
    }
  }

  getDarkModeSettingFromLocalStorage() {
    return localStorage.getItem(AuthService.darkModeKey) === 'true';
  }

  setDarkModeSettingInLocalStorage(isDarkMode: boolean) {
    localStorage.setItem(AuthService.darkModeKey, JSON.stringify(isDarkMode));
  }
}
