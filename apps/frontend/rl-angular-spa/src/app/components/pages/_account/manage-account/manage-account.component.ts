import {CommonModule, NgOptimizedImage} from '@angular/common';
import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatOption} from '@angular/material/autocomplete';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatSelect} from '@angular/material/select';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {FloatLabelModule} from 'primeng/floatlabel';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {Ripple} from 'primeng/ripple';
import {StyleClassModule} from 'primeng/styleclass';
import {Subscription} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';
import {AccountSettingsComponent} from '../../../lib/_account/account-settings/account-settings.component';
import {NotificationsSettingsComponent} from '../../../lib/_account/notifications-settings/notifications-settings.component';
import {PremiumSettingsComponent} from '../../../lib/_account/premium-settings/premium-settings.component';
import {ProfileSettingsComponent} from '../../../lib/_account/profile-settings/profile-settings.component';

@Component({
  selector: 'app-manage-account',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ButtonModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    Ripple,
    DividerModule,
    FloatLabelModule,
    InputTextareaModule,
    CheckboxModule,
    StyleClassModule,
    ProfileSettingsComponent,
    AccountSettingsComponent,
    PremiumSettingsComponent,
    NotificationsSettingsComponent,
  ],
  templateUrl: './manage-account.component.html',
  styleUrl: './manage-account.component.scss',
})
export class ManageAccountComponent implements OnInit, OnDestroy {
  protected static readonly profileTabIndex = 0;
  protected static readonly accountTabIndex = 1;
  protected static readonly premiumTabIndex = 2;
  protected static readonly notificationsTabIndex = 3;

  protected activeTabIndex: number = 0;

  protected readonly profileTabIndex = ManageAccountComponent.profileTabIndex;
  protected readonly accountTabIndex = ManageAccountComponent.accountTabIndex;
  protected readonly premiumTabIndex = ManageAccountComponent.premiumTabIndex;
  protected readonly notificationsTabIndex =
    ManageAccountComponent.notificationsTabIndex;
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);

  private readonly activatedRoute = inject(ActivatedRoute);

  private queryParamsSubscription?: Subscription;

  ngOnInit() {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe(
        (params) => {
          const tab = params['tab'];
          if (!tab) {
            return;
          }
          if (tab === 'profile') {
            this.activeTabIndex = ManageAccountComponent.profileTabIndex;
          } else if (tab === 'account') {
            this.activeTabIndex = ManageAccountComponent.accountTabIndex;
          } else if (tab === 'premium') {
            this.activeTabIndex = ManageAccountComponent.premiumTabIndex;
          } else if (tab === 'notifications') {
            this.activeTabIndex = ManageAccountComponent.notificationsTabIndex;
          }
        },
    );
  }

  ngOnDestroy() {
    this.queryParamsSubscription?.unsubscribe();
  }
}
