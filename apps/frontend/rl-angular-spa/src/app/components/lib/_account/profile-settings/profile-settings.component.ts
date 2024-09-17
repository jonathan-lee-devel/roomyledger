import {NgOptimizedImage} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {watchState} from '@ngrx/signals';
import {Button, ButtonDirective} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-profile-settings',
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
    ReactiveFormsModule,
    Ripple,
    FormsModule,
  ],
  templateUrl: './profile-settings.component.html',
  styleUrl: './profile-settings.component.scss',
})
export class ProfileSettingsComponent {
  protected email: string = '';
  protected displayName: string = '';
  protected iban: string = '';
  protected revTag: string = '';
  protected value1: string = '';

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);

  constructor() {
    watchState(this.userAuthenticationStore, () => {
      const userInfo = this.userAuthenticationStore.userInfo();
      this.email = userInfo.email;
      this.displayName = userInfo.displayName;
      if (userInfo.iban) {
        this.iban = userInfo.iban;
      }
      if (userInfo.revTag) {
        this.revTag = userInfo.revTag;
      }
    });
  }
}
