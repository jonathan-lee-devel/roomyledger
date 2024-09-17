import {NgClass} from '@angular/common';
import {Component, inject, input} from '@angular/core';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

@Component({
  selector: 'app-h1-dark-mode',
  standalone: true,
  imports: [
    NgClass,
  ],
  templateUrl: './h1-dark-mode.component.html',
  styleUrl: './h1-dark-mode.component.scss',
})
export class H1DarkModeComponent {
  innerText = input.required<string>();
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
}
