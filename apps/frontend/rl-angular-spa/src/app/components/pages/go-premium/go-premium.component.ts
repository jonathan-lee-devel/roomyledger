import {Component} from '@angular/core';
import {ButtonDirective} from 'primeng/button';

import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {PremiumFeaturesListComponent} from '../../lib/landing-page/premium-features-list/premium-features-list.component';
import {PricingPlansSectionComponent} from '../../lib/landing-page/pricing-plans-section/pricing-plans-section.component';

@Component({
  selector: 'app-go-premium',
  standalone: true,
  imports: [
    PricingPlansSectionComponent,
    ButtonDirective,
    PremiumFeaturesListComponent,
  ],
  templateUrl: './go-premium.component.html',
  styleUrl: './go-premium.component.scss',
})
export class GoPremiumComponent {
  protected readonly RoutePath = RoutePath;
  protected readonly rebaseRoutePath = rebaseRoutePath;
}
