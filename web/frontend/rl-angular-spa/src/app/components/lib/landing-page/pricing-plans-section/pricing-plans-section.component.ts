import {Component, inject} from '@angular/core';
import {ButtonDirective} from 'primeng/button';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'app-pricing-plans-section',
  standalone: true,
  imports: [ButtonDirective, Ripple],
  templateUrl: './pricing-plans-section.component.html',
  styleUrl: './pricing-plans-section.component.scss',
})
export class PricingPlansSectionComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly environment = environment;
}
