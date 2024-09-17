import {AsyncPipe, NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {RouterLink} from '@angular/router';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';

@Component({
  selector: 'app-error-class-not-found',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    RouterLink,
  ],
  templateUrl: './error-not-found.component.html',
  styleUrl: './error-not-found.component.scss',
})
export class ErrorNotFoundComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly RouterLink = RouterLink;
}
