import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, EventEmitter, inject, OnInit, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatBadgeModule} from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import {Router, RouterLink} from '@angular/router';
import {watchState} from '@ngrx/signals';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {InputSwitchChangeEvent, InputSwitchModule} from 'primeng/inputswitch';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {FeatureFlagsStore} from '../../../+state/feature-flags/feature-flags.store';
import {NotificationsStore} from '../../../+state/notifications/notifications.store';
import {PaymentStore} from '../../../+state/payment/payment.store';
import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {SupabaseService} from '../../../services/supabase/supabase.service';
import {RouterUtils} from '../../../util/router/Router.utils';
import {SpanDarkModeComponent} from '../_dark-mode/span-dark-mode/span-dark-mode.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatSlideToggleModule,
    RouterLink,
    RouterLink,
    MatIconModule,
    MatBadgeModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    ButtonModule,
    BadgeModule,
    InputSwitchModule,
    FormsModule,
    SpanDarkModeComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Output() darkModeToggleEvent: EventEmitter<InputSwitchChangeEvent> =
    new EventEmitter<InputSwitchChangeEvent>();
  @Output() sideNavToggleEvent: EventEmitter<boolean> =
    new EventEmitter<boolean>();
  protected isDarkMode: boolean = true;

  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly featureFlagsStore = inject(FeatureFlagsStore);
  protected readonly paymentStore = inject(PaymentStore);
  protected readonly notificationsStore = inject(NotificationsStore);
  private readonly supabaseService = inject(SupabaseService);

  private readonly router = inject(Router);

  constructor() {
    watchState(this.userAuthenticationStore, () => {
      this.isDarkMode = this.userAuthenticationStore.isDarkMode();
    });
  }

  ngOnInit() {
    this.isDarkMode = this.userAuthenticationStore.isDarkMode();
    if (
      this.userAuthenticationStore.loggedInState() === 'LOGGED_IN' &&
      this.supabaseService.session
    ) {
      this.notificationsStore.loadNotifications();
    }
  }

  formatNotificationSummary(notification: string) {
    return `${notification.substring(0, 27)}...`;
  }

  doLogout() {
    this.notificationsStore.unloadNotifications();
    this.userAuthenticationStore.logout();
  }

  goHome() {
    this.router.navigate(['/']).catch(RouterUtils.navigateCatchErrorCallback);
  }

  goToDashboard() {
    this.router
        .navigate([rebaseRoutePath(RoutePath.MAIN_MENU)])
        .catch(RouterUtils.navigateCatchErrorCallback);
  }

  goToGoPremiumPage() {
    this.router
        .navigate([rebaseRoutePath(RoutePath.GO_PREMIUM)])
        .catch(RouterUtils.navigateCatchErrorCallback);
  }

  handleDarkModeToggleChange($event: InputSwitchChangeEvent) {
    this.darkModeToggleEvent.emit($event);
  }
}
