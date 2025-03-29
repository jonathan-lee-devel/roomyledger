import {Component, inject} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {DividerModule} from 'primeng/divider';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-notifications-settings',
  standalone: true,
  imports: [
    Button,
    CheckboxModule,
    DividerModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    ReactiveFormsModule,
    Ripple,
  ],
  templateUrl: './notifications-settings.component.html',
  styleUrl: './notifications-settings.component.scss',
})
export class NotificationsSettingsComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
}
