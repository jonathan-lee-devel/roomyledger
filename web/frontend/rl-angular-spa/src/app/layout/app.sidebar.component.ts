import {Component, ElementRef, inject, ViewChild} from '@angular/core';

import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './app.sidebar.component.html',
})
export class AppSidebarComponent {
  @ViewChild('menuContainer') menuContainer!: ElementRef;
  readonly layoutService = inject(LayoutService);
  readonly el = inject(ElementRef);
}
