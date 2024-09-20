import {NgClass, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {Button, ButtonDirective} from 'primeng/button';
import {ChipsModule} from 'primeng/chips';
import {DialogModule} from 'primeng/dialog';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {FeatureFlagsStore} from '../../../+state/feature-flags/feature-flags.store';
import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {SpanDarkModeComponent} from '../_dark-mode/span-dark-mode/span-dark-mode.component';
import {
  EmailLoginOverlayPanelComponent,
} from '../_users/email-login-overlay-panel/email-login-overlay-panel.component';

@Component({
  selector: 'app-splash-banner',
  standalone: true,
  imports: [
    ButtonDirective,
    RouterLink,
    Button,
    AvatarModule,
    DialogModule,
    NgIf,
    Ripple,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipsModule,
    NgForOf,
    NgOptimizedImage,
    EmailLoginOverlayPanelComponent,
    NgClass,
    SpanDarkModeComponent,
  ],
  templateUrl: './splash-banner.component.html',
  styleUrl: './splash-banner.component.scss',
})
export class SplashBannerComponent {
  isNewCustomer = input<boolean>(true);

  protected readonly RoutePath = RoutePath;
  protected readonly rebaseRoutePath = rebaseRoutePath;

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly featureFlagsStore = inject(FeatureFlagsStore);

  doGoogleLogin() {
    if (!this.featureFlagsStore.isSignInWithGoogleEnabled()) {
      return;
    }
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle()
        .catch((reason) => console.error(reason));
  }

  doAppleLogin() {
    if (!this.featureFlagsStore.isSignInWithAppleEnabled()) {
      return;
    }
  }

  doGitHubLogin() {
    if (!this.featureFlagsStore.isSignInWithGitHubEnabled()) {
      return;
    }
    this.userAuthenticationStore.attemptSupabaseLoginWithGitHub()
        .catch((reason) => console.error(reason));
  }

  getWelcomeMessage(isNewCustomer: boolean) {
    return (isNewCustomer) ? 'Welcome to RoomyLedger.com' : 'Welcome Back to RoomyLedger.com';
  }

  getVerb(isNewCustomer: boolean) {
    return (isNewCustomer) ? 'Up' : 'In';
  }
}
