import {NgOptimizedImage} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Button, ButtonDirective} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-account-settings',
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
  ],
  templateUrl: './account-settings.component.html',
  styleUrl: './account-settings.component.scss',
})
export class AccountSettingsComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
}
