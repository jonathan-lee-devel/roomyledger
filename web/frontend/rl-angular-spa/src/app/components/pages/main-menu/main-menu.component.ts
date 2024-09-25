import {CommonModule} from '@angular/common';
import {Component, inject} from '@angular/core';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {H1DarkModeComponent} from '../../lib/_dark-mode/h1-dark-mode/h1-dark-mode.component';
import {PDarkModeComponent} from '../../lib/_dark-mode/p-dark-mode/p-dark-mode.component';
import {CardWithLinkComponent} from '../../lib/card-with-link/card-with-link.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [
    CommonModule,
    CardWithLinkComponent,
    PDarkModeComponent,
    H1DarkModeComponent,
  ],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly navigationTitle: string = 'Navigation';
}
