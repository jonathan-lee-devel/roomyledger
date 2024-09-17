import {NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {environment} from '../../../../../environments/environment';
import {PremiumFeaturesListComponent} from '../premium-features-list/premium-features-list.component';

@Component({
  selector: 'app-pricing-plans-section',
  standalone: true,
  imports: [ButtonDirective, NgClass, Ripple, PremiumFeaturesListComponent],
  templateUrl: './pricing-plans-section.component.html',
  styleUrl: './pricing-plans-section.component.scss',
})
export class PricingPlansSectionComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly environment = environment;
}
