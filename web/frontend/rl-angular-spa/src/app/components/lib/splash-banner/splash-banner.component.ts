import {Component, computed, inject, input} from '@angular/core';
import {RouterLink} from '@angular/router';
import {AvatarModule} from 'primeng/avatar';
import {Button, ButtonDirective} from 'primeng/button';
import {ChipsModule} from 'primeng/chips';
import {DialogModule} from 'primeng/dialog';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Ripple} from 'primeng/ripple';
import {FlagService} from 'zenigo-client-sdk';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
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
    Ripple,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipsModule,
    EmailLoginOverlayPanelComponent,
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
  private readonly flagService = inject(FlagService);
  protected readonly isSignInWithEmailEnabled = computed(() => this.flagService.flags().find((flag) => flag.key === 'SIGN_IN_WITH_EMAIL')?.isEnabled ?? false);
  protected readonly isSignInWithGoogleEnabled = computed(() => this.flagService.flags().find((flag) => flag.key === 'SIGN_IN_WITH_GOOGLE')?.isEnabled ?? false);
  protected readonly isSignInWithGithubEnabled = computed(() => this.flagService.flags().find((flag) => flag.key === 'SIGN_IN_WITH_GITHUB')?.isEnabled ?? false);
  protected readonly isSignInWithAppleEnabled = computed(() => this.flagService.flags().find((flag) => flag.key === 'SIGN_IN_WITH_APPLE')?.isEnabled ?? false);

  doGoogleLogin() {
    if (!this.isSignInWithGoogleEnabled()) {
      return;
    }
    this.userAuthenticationStore.attemptSupabaseLoginWithGoogle()
        .catch((reason) => console.error(reason));
  }

  doAppleLogin() {
    if (!this.isSignInWithAppleEnabled()) {
      return;
    }
  }

  doGitHubLogin() {
    if (!this.isSignInWithGithubEnabled()) {
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
