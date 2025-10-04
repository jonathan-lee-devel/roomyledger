import {Component, computed, inject, input} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {ChipsModule} from 'primeng/chips';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Ripple} from 'primeng/ripple';
import {FlagService} from 'zenigo-client-sdk';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-email-login-overlay-panel',
  standalone: true,
  imports: [
    Button,
    ChipsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    OverlayPanelModule,
    FormsModule,
    Ripple,
  ],
  templateUrl: './email-login-overlay-panel.component.html',
  styleUrl: './email-login-overlay-panel.component.scss',
})
export class EmailLoginOverlayPanelComponent {
  isNewCustomer = input<boolean>(true);

  email: string = '';
  password: string = '';

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  private readonly flagService = inject(FlagService);
  protected readonly isSignInWithEmailEnabled = computed(() => this.flagService.flags().find((flag) => flag.key === 'SIGN_IN_WITH_EMAIL')?.isEnabled ?? false);

  doEmailLoginOrSignUp() {
    if (this.isNewCustomer()) {
      this.userAuthenticationStore
          .attemptSupabaseSignUpWithEmail(this.email, this.password)
          .catch((reason) => console.error(reason));
    } else {
      this.userAuthenticationStore
          .attemptSupabaseLoginWithEmail(this.email, this.password)
          .catch((reason) => console.error(reason));
    }
    this.resetForm();
  }

  getVerb(isNewCustomer: boolean) {
    return isNewCustomer ? 'Up' : 'In';
  }

  private resetForm() {
    this.email = '';
    this.password = '';
  }
}
