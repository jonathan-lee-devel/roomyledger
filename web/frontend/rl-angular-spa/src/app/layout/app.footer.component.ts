import {Component, inject} from '@angular/core';

import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-footer',
  templateUrl: './app.footer.component.html',
})
export class AppFooterComponent {
  readonly layoutService = inject(LayoutService);

  get colorScheme(): string {
    return this.layoutService.config().colorScheme;
  }
}
