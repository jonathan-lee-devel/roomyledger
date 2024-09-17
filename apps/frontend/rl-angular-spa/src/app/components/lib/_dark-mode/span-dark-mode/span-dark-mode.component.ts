import {NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-span-dark-mode',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './span-dark-mode.component.html',
  styleUrl: './span-dark-mode.component.scss',
})
export class SpanDarkModeComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
}
