import {NgClass} from '@angular/common';
import {Component, inject, input} from '@angular/core';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-p-dark-mode',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './p-dark-mode.component.html',
  styleUrl: './p-dark-mode.component.scss',
})
export class PDarkModeComponent {
  innerText = input.required<string>();
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
}
