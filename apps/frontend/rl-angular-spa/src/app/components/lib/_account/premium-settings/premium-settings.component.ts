import {NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {Button, ButtonDirective} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {PaymentStore} from '../../../../+state/payment/payment.store';

@Component({
  selector: 'app-premium-settings',
  standalone: true,
  imports: [
    Button,
    ButtonDirective,
    CheckboxModule,
    DividerModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    NgOptimizedImage,
    Ripple,
    NgIf,
    ProgressSpinnerModule,
  ],
  templateUrl: './premium-settings.component.html',
  styleUrl: './premium-settings.component.scss',
})
export class PremiumSettingsComponent implements OnInit {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly paymentsStore = inject(PaymentStore);

  private readonly confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.paymentsStore.loadActiveSubscriptions();
  }

  promptCancelSubscriptions() {
    this.confirmationService.confirm({
      accept: () => this.paymentsStore.cancelSubscriptions(),
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      message: 'Do you want to cancel your subscriptions?',
    });
  }

  formatDate(trialEndDate: Date | undefined) {
    if (!trialEndDate) {
      return;
    }
    return new Date(trialEndDate).toLocaleDateString();
  }
}
