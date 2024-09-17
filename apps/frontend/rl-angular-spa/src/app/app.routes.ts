import {Routes} from '@angular/router';

import {ManageAccountComponent} from './components/pages/_account/manage-account/manage-account.component';
import {ErrorNotFoundComponent} from './components/pages/_errors/error-not-found/error-not-found.component';
import {StripePaymentComponent} from './components/pages/_payment/stripe-payment/stripe-payment.component';
import {
  PropertiesAcceptInvitationComponent,
} from './components/pages/_properties/properties-accept-invitation/properties-accept-invitation.component';
import {PropertiesCreateComponent} from './components/pages/_properties/properties-create/properties-create.component';
import {
  PropertiesDashboardComponent,
} from './components/pages/_properties/properties-dashboard/properties-dashboard.component';
import {PropertiesManageComponent} from './components/pages/_properties/properties-manage/properties-manage.component';
import {LoginComponent} from './components/pages/_users/login/login.component';
import {LoginInProgressComponent} from './components/pages/_users/login-in-progress/login-in-progress.component';
import {LoginSuccessComponent} from './components/pages/_users/login-success/login-success.component';
import {LogoutInProgressComponent} from './components/pages/_users/logout-in-progress/logout-in-progress.component';
import {GoPremiumComponent} from './components/pages/go-premium/go-premium.component';
import {LandingPageComponent} from './components/pages/landing-page/landing-page.component';
import {MainMenuComponent} from './components/pages/main-menu/main-menu.component';
import {NotificationsComponent} from './components/pages/notifications/notifications.component';
import {authGuard} from './guards/auth.guard';
import {reverseAuthGuard} from './guards/reverse-auth.guard';

export enum RoutePath {
  /* ANONYMOUS ROUTES */
  LANDING_PAGE = '',
  LOGIN = 'login',
  LOGIN_IN_PROGRESS = 'login-in-progress',
  LOGIN_SUCCESS = 'login-success',
  LOGOUT_IN_PROGRESS = 'logout-in-progress',
  REGISTER_CONFIRM = 'register/confirm/:tokenValue',
  RESET_PASSWORD = 'reset-password',
  RESET_PASSWORD_CONFIRM = 'reset-password/confirm/:tokenValue',
  /* ERROR ROUTES */
  SERVER_ERROR = 'error/server-error',
  ERROR_NOT_FOUND = 'error/not-found',
  /* LOADING ROUTES */
  STRIPE_PAYMENT = 'stripe-payment',
  /* MAIN MENU ROUTES */
  MAIN_MENU = 'main-menu',
  /* NOTIFICATION ROUTES */
  NOTIFICATIONS = 'notifications',
  /* ACCOUNT ROUTES */
  ACCOUNT_MANAGE = 'account/manage',
  GO_PREMIUM = 'go-premium',
  /* PROPERTY ROUTES */
  PROPERTIES_INVITATIONS_ACCEPT_ID_TOKEN_VALUE = `properties/:propertyId/invitations/accept/:tokenValue`,
  LEDGERS_MANAGE = 'ledgers/manage',
  LEDGERS_CREATE = 'ledgers/create',
  LEDGERS_DASHBOARD_ID = 'ledgers/dashboard/:propertyId',
}

export const rebaseRoutePath = (routePath: RoutePath) => `/${routePath}`;
export const rebaseRoutePathAsString = (routePathAsString: string) =>
  `/${routePathAsString}`;

export const routePathParameters = {
  PROPERTY_ID: ':propertyId',
  TOKEN_VALUE: ':tokenValue',
} as const;

export const routes: Routes = [
  {
    path: RoutePath.LANDING_PAGE,
    component: LandingPageComponent,
    title: 'RoomyLedger',
  },
  {
    path: RoutePath.LOGIN,
    component: LoginComponent,
    title: 'RoomyLedger | Login',
    canActivate: [reverseAuthGuard],
  },
  {
    path: RoutePath.LOGIN_IN_PROGRESS,
    component: LoginInProgressComponent,
    title: 'RoomyLedger | Login in Progress',
  },
  {
    path: RoutePath.LOGIN_SUCCESS,
    component: LoginSuccessComponent,
    title: 'RoomyLedger | Login Success',
  },
  {
    path: RoutePath.LOGOUT_IN_PROGRESS,
    component: LogoutInProgressComponent,
    title: 'RoomyLedger | Logout in Progress',
  },
  {
    path: RoutePath.STRIPE_PAYMENT,
    component: StripePaymentComponent,
    title: 'RoomyLedger | Stripe Payment',
  },
  {
    path: RoutePath.GO_PREMIUM,
    component: GoPremiumComponent,
    title: 'RoomyLedger | Go Premium',
  },
  {
    path: RoutePath.NOTIFICATIONS,
    component: NotificationsComponent,
    title: 'RoomyLedger | Notifications',
    canActivate: [authGuard],
  },
  {
    path: RoutePath.MAIN_MENU,
    component: MainMenuComponent,
    title: 'RoomyLedger | Main Menu',
    canActivate: [authGuard],
  },
  {
    path: RoutePath.ACCOUNT_MANAGE,
    component: ManageAccountComponent,
    title: 'RoomyLedger | Account',
    canActivate: [authGuard],
  },
  /* PROPERTY ROUTES */
  {
    path: RoutePath.PROPERTIES_INVITATIONS_ACCEPT_ID_TOKEN_VALUE,
    component: PropertiesAcceptInvitationComponent,
    title: 'RoomyLedger | Accept Invitation',
  },
  {
    path: RoutePath.LEDGERS_MANAGE,
    component: PropertiesManageComponent,
    title: 'RoomyLedger | Manage Ledgers',
    canActivate: [authGuard],
  },
  {
    path: RoutePath.LEDGERS_CREATE,
    component: PropertiesCreateComponent,
    title: 'RoomyLedger | Create Property',
    canActivate: [authGuard],
  },
  {
    path: RoutePath.LEDGERS_DASHBOARD_ID,
    component: PropertiesDashboardComponent,
    title: 'RoomyLedger | Property Dashboard',
    canActivate: [authGuard],
  },
  {
    path: '**',
    component: ErrorNotFoundComponent,
    title: 'RoomyLedger | Page Not Found',
  },
];
