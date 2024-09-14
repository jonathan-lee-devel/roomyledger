import {AsyncPipe, NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';

import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {rebaseRoutePath, RoutePath} from '../../../../app.routes';

@Component({
  selector: 'app-properties-create',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    NgOptimizedImage,
    MatProgressSpinnerModule,
    NgIf,
    AsyncPipe,
    ButtonModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    CheckboxModule,
  ],
  templateUrl: './properties-create.component.html',
  styleUrl: './properties-create.component.scss',
})
export class PropertiesCreateComponent {
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;

  protected name: string = '';
  protected addSelfAsTenant: boolean = true;

  protected readonly propertiesStore = inject(PropertiesStore);

  constructor() {
  }

  doCreateProperty() {
    this.propertiesStore.createProperty({
      name: this.name,
      addSelfAsTenant: this.addSelfAsTenant,
    });
  }
}
