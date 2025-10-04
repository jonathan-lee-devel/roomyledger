import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, computed, inject, OnInit, ViewChild} from '@angular/core';
import {NavigationEnd, Router, RouterLink, RouterOutlet} from '@angular/router';
import {inject as vercelInject} from '@vercel/analytics';
import {PrimeNGConfig} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {InputSwitchChangeEvent} from 'primeng/inputswitch';
import {MessagesModule} from 'primeng/messages';
import {Sidebar, SidebarModule} from 'primeng/sidebar';
import {ToastModule} from 'primeng/toast';
import {filter, Observable, tap} from 'rxjs';
import {FlagService} from 'zenigo-client-sdk';

import {UserAuthenticationStore} from './+state/auth/user-auth.store';
import {NotificationsStore} from './+state/notifications/notifications.store';
import {PaymentStore} from './+state/payment/payment.store';
import {rebaseRoutePath, RoutePath} from './app.routes';
import {environment} from '../environments/environment';
import {FooterComponent} from './components/lib/footer/footer.component';
import {ApplicationMessageComponent} from './components/lib/messages/application-message/application-message.component';
import {FreeTrialMessageComponent} from './components/lib/messages/free-trial-message/free-trial-message.component';
import {UpdateOrMaintenanceInProgressMessageComponent} from './components/lib/messages/update-or-maintenance-in-progress-message/update-or-maintenance-in-progress-message.component';
import {NavbarComponent} from './components/lib/navbar/navbar.component';
import {ApplicationMessageDto} from './dtos/application-messages/ApplicationMessageDto';
import {
  AppConfig,
  ColorScheme,
  LayoutService,
} from './layout/service/app.layout.service';
import {ApplicationMessageService} from './services/application-message/application-message.service';
import {AuthService} from './services/auth/auth.service';
import {SupabaseService} from './services/supabase/supabase.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    ToastModule,
    AvatarModule,
    ButtonModule,
    MessagesModule,
    ConfirmDialogModule,
    FooterComponent,
    FreeTrialMessageComponent,
    ApplicationMessageComponent,
    UpdateOrMaintenanceInProgressMessageComponent,
    RouterLink,
    SidebarModule,
    NgOptimizedImage,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'RoomyLedger';
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  protected isSidebarVisible: boolean = false;
  protected colorScheme: ColorScheme = 'light';
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly notificationsStore = inject(NotificationsStore);
  protected readonly paymentStore = inject(PaymentStore);
  protected publicApplicationMessage$: Observable<ApplicationMessageDto[]>;
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly Router = Router;
  private readonly REFRESH_EVENT_ID = 1;
  private readonly flagService = inject(FlagService);
  protected readonly isSignInWithAppleEnabled = computed(() => this.flagService.flags().find((flag) => flag.key === 'SIGN_IN_WITH_APPLE')?.isEnabled ?? false);
  protected readonly isUpdateOrMaintenanceInProgress = computed(() => this.flagService.flags().find((flag) => flag.key === 'IS_UPDATE_OR_MAINTENANCE_IN_PROGRESS')?.isEnabled ?? false);

  constructor(
    private readonly router: Router,
    private readonly primengConfig: PrimeNGConfig,
    private readonly layoutService: LayoutService,
    private readonly applicationMessageService: ApplicationMessageService,
    private readonly authService: AuthService,
    private readonly supabaseService: SupabaseService,
  ) {
    this.publicApplicationMessage$ =
      this.applicationMessageService.getPublicApplicationMessage();
    this.supabaseService.authChanges((_, session) => {
      if (!session?.access_token) {
        return;
      }
      this.userAuthenticationStore
          .onLoginComplete(
              {
                accessToken: session?.access_token ?? '',
                refreshToken: session?.refresh_token ?? '',
              },
              {
                email: session?.user?.email ?? '',
                displayName: session?.user?.user_metadata?.['name'] ?? '',
              },
          )
          .then(() => {
            if (
              this.userAuthenticationStore.loggedInState() === 'LOGGED_IN' &&
            this.supabaseService.session
            ) {
              this.userAuthenticationStore.userCheckIn();
              this.paymentStore.loadPaymentStatus();
              this.notificationsStore.loadNotifications();
            }
          });
    });
  }

  closeCallback(e: Event): void {
    this.sidebarRef.close(e);
  }

  ngOnInit() {
    if (!environment.local) {
      vercelInject({
        framework: 'Angular',
        mode: environment.production ? 'production' : 'development',
      });
    }
    this.flagService.init({host: environment.ZENIGO_HOST, apiKey: environment.ZENIGO_API_KEY});
    this.flagService.fetchFlags();
    this.flagService.startFlagUpdateStream();
    this.primengConfig.ripple = true;
    const config: AppConfig = {
      ripple: true,
      inputStyle: 'outlined',
      menuMode: 'slim-plus',
      colorScheme: this.colorScheme,
      theme: 'blue',
      layoutTheme: 'colorScheme',
      scale: 14,
    };
    this.layoutService.config.set(config);
    if (
      this.authService.getDarkModeSettingFromLocalStorage() &&
      !this.userAuthenticationStore.isDarkMode()
    ) {
      this.userAuthenticationStore.setDarkModeEnabled();
    } else if (
      !this.authService.getDarkModeSettingFromLocalStorage() &&
      this.userAuthenticationStore.isDarkMode()
    ) {
      this.userAuthenticationStore.setLightModeEnabled();
    }
    this.router.events
        .pipe(
            tap(() => {
              if (
                this.authService.getDarkModeSettingFromLocalStorage() &&
            !this.userAuthenticationStore.isDarkMode()
              ) {
                this.userAuthenticationStore.setDarkModeEnabled();
              } else if (
                !this.authService.getDarkModeSettingFromLocalStorage() &&
            this.userAuthenticationStore.isDarkMode()
              ) {
                this.userAuthenticationStore.setLightModeEnabled();
              }
            }),
            filter(
                (routerEvent): routerEvent is NavigationEnd =>
                  routerEvent instanceof NavigationEnd,
            ),
            filter((event) => event.id === this.REFRESH_EVENT_ID),
            tap(() => {
              this.userAuthenticationStore.checkLoginOnRefresh();
            }),
            filter(
                () => this.userAuthenticationStore.loggedInState() === 'LOGGED_IN',
            ),
            tap(() => {
              this.notificationsStore.loadNotifications();
              this.paymentStore.loadPaymentStatus();
            }),
        )
        .subscribe();
    this.router.events
        .pipe(
            filter(
                (routerEvent): routerEvent is NavigationEnd =>
                  routerEvent instanceof NavigationEnd,
            ),
            tap((event) => {
              this.authService.setNextParamInLocalStorageIfNotAnonymous(event.url);
            }),
        )
        .subscribe();
  }

  handleDarkModeToggleEvent($event: InputSwitchChangeEvent) {
    if ($event.checked) {
      this.userAuthenticationStore.setDarkModeEnabled();
    } else {
      this.userAuthenticationStore.setLightModeEnabled();
    }
  }
}
