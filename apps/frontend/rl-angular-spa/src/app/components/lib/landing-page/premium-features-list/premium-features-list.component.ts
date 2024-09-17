import {Component} from '@angular/core';

import {ComponentOrFeatureComponent} from '../component-or-feature/component-or-feature.component';

@Component({
  selector: 'app-premium-features-list',
  standalone: true,
  imports: [ComponentOrFeatureComponent],
  templateUrl: './premium-features-list.component.html',
  styleUrl: './premium-features-list.component.scss',
})
export class PremiumFeaturesListComponent {}
