import {CommonModule} from '@angular/common';
import {AfterViewInit, Component, inject, OnDestroy} from '@angular/core';
import {ShepherdService} from 'angular-shepherd';

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
export class MainMenuComponent implements AfterViewInit, OnDestroy {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly navigationTitle: string = 'Navigation';

  private readonly shepherdService = inject(ShepherdService);

  ngAfterViewInit() {
    if (JSON.parse(localStorage.getItem('create-first-ledger-tour') ?? 'false')) {
      return;
    }
    const cardElement = document.querySelector('.create-ledger-card') as HTMLElement;
    if (!cardElement) {
      return;
    }
    this.shepherdService.modal = false;
    this.shepherdService.confirmCancel = false;
    this.shepherdService.addSteps([{
      id: 'create-first-ledger',
      arrow: true,
      title: 'Create a Ledger',
      text: 'Click here to create your first ledger',
      buttons: [
        {
          text: `Don't Show Again`,
          action: () => {
            this.shepherdService?.cancel();
            localStorage.setItem('create-first-ledger-tour', JSON.stringify(true));
          },
        },
        {
          text: 'Close',
          action: () => this.shepherdService?.cancel(),
        },
      ],
      attachTo: {
        element: cardElement,
        on: 'top-end',
      },
    }]);
    this.shepherdService.start();
  }

  ngOnDestroy() {
    if (this.shepherdService !== null) {
      this.shepherdService?.cancel();
    }
  }
}
