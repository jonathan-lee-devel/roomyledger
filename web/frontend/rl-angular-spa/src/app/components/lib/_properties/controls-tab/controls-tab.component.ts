import {NgForOf, NgIf} from '@angular/common';
import {Component, inject, input, OnDestroy} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {ChipsModule} from 'primeng/chips';
import {DividerModule} from 'primeng/divider';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {OverlayPanelModule} from 'primeng/overlaypanel';

import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {environment} from '../../../../../environments/environment';
import {rebaseRoutePathAsString, RoutePath} from '../../../../app.routes';


@Component({
  selector: 'app-controls-tab',
  standalone: true,
  imports: [
    MatDividerModule,
    MatListModule,
    RouterLink,
    DividerModule,
    ButtonModule,
    NgIf,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipsModule,
    NgForOf,
  ],
  templateUrl: './controls-tab.component.html',
  styleUrl: './controls-tab.component.scss',
})
export class ControlsTabComponent implements OnDestroy {
  propertyId = input.required<string>();
  currentUserIsAdmin = input.required<boolean>();

  protected readonly propertiesStore = inject(PropertiesStore);

  protected readonly rebaseRoutePathAsString = rebaseRoutePathAsString;
  protected readonly RoutePath = RoutePath;
  protected readonly environment = environment;

  ref?: DynamicDialogRef;

  ngOnDestroy() {
    this.ref?.close();
  }

  doDeleteProperty() {
    this.propertiesStore.promptDeletePropertyById(this.propertyId());
  }
}
