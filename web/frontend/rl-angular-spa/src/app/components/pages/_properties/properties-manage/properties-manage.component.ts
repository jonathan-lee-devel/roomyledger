import {CommonModule} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {RouterLink} from '@angular/router';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {PaymentStore} from '../../../../+state/payment/payment.store';
import {
  rebaseRoutePath,
  rebaseRoutePathAsString,
  RoutePath,
  routePathParameters,
} from '../../../../app.routes';
import {PropertyDto} from '../../../../dtos/properties/Property.dto';
import {CardWithLinkComponent} from '../../../lib/card-with-link/card-with-link.component';

@Component({
  selector: 'app-properties-manage',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    CardWithLinkComponent,
    MatProgressSpinnerModule,
  ],
  templateUrl: './properties-manage.component.html',
  styleUrl: './properties-manage.component.scss',
})
export class PropertiesManageComponent implements OnInit {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly paymentStore = inject(PaymentStore);

  protected readonly routePathParameters = routePathParameters;
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly rebaseRoutePathAsString = rebaseRoutePathAsString;

  ngOnInit() {
    this.propertiesStore.loadPropertiesWhereInvolved();
  }

  getPropertyCardButtonActionText(property: PropertyDto, email: string) {
    return property.administrators
        .map((administrator) => administrator.user.email)
        .includes(email) ?
      'Manage' :
      'View';
  }

  getPropertyCardBodyText(property: PropertyDto, email: string) {
    return property.administrators
        .map((administrator) => administrator.user.email)
        .includes(email) ?
      'You are an Administrator Here' :
      'You are a Tenant Here';
  }

  isCurrentUserCreatorOfProperty(email: string, property: PropertyDto) {
    return property.createdBy.email === email;
  }

  deletePropertyById(propertyId: string) {
    this.propertiesStore.promptDeletePropertyById(propertyId);
  }

  isCreatePropertyDisabled() {
    return this.paymentStore.paymentStatus() === 'UNPAID';
  }

  getCreatePropertyCardText() {
    return this.paymentStore.paymentStatus() === 'UNPAID' ?
      'This is a premium feature (you can still join other properties for free)' :
      'Click below to create your own';
  }
}
