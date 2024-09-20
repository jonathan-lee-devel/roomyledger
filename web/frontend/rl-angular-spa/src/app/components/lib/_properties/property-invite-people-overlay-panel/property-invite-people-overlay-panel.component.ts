import {Clipboard} from '@angular/cdk/clipboard';
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {ChipsModule} from 'primeng/chips';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Ripple} from 'primeng/ripple';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {environment} from '../../../../../environments/environment';
import {PropertyDto} from '../../../../dtos/properties/Property.dto';

@Component({
  selector: 'app-property-invite-people-overlay-panel',
  standalone: true,
  imports: [
    Button,
    ChipsModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    NgForOf,
    OverlayPanelModule,
    FormsModule,
    Ripple,
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
  ],
  templateUrl: './property-invite-people-overlay-panel.component.html',
  styleUrl: './property-invite-people-overlay-panel.component.scss',
})
export class PropertyInvitePeopleOverlayPanelComponent {
  email: string = '';
  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected isCopied: boolean = false;

  constructor(private readonly clipboard: Clipboard) {}

  getPropertyDashboardShareURL() {
    return `${environment.FRONT_END_URL}/ledgers/dashboard/${this.propertiesStore.propertyById().id}`;
  }

  copyPropertyDashboardShareURL() {
    this.clipboard.copy(this.getPropertyDashboardShareURL());
    this.isCopied = true;
    setTimeout(() => {
      this.isCopied = false;
    }, 2500);
  }

  doInviteTenant() {
    this.propertiesStore.inviteTenantToProperty(
        this.propertiesStore.propertyId(),
        this.email,
    );
  }

  getCombinedMembers(
      property: PropertyDto,
  ): {email: string; displayName: string; role: string}[] {
    const membersWithDuplicates = [
      ...property.administrators.map((administrator) => ({
        displayName: administrator.user.profile.displayName,
        email: administrator.user.email,
        role: this.getRole(administrator.user.email, property),
      })),
    ].concat([
      ...property.tenants.map((tenant) => ({
        displayName: tenant.user.profile.displayName,
        email: tenant.user.email,
        role: this.getRole(tenant.user.email, property),
      })),
    ]);
    return membersWithDuplicates.filter(
        (member, index, self) =>
          index === self.findIndex((m) => m.email === member.email),
    );
  }

  isInvitePeopleDisabled() {
    return !this.propertiesStore
        .propertyById()
        .administrators.map((administrator) => administrator.user.email)
        .includes(this.userAuthenticationStore.currentUserEmail());
  }

  private getRole(email: string, property: PropertyDto) {
    let role = '';
    let isAdmin: boolean = false;
    if (
      property.administrators
          .map((administrator) => administrator.user.email)
          .includes(email)
    ) {
      role = `${role}Admin`;
      isAdmin = true;
    }
    if (property.tenants.map((tenant) => tenant.user.email).includes(email)) {
      role = isAdmin ? `${role} and Tenant` : `${role}Tenant`;
    }
    return role;
  }
}
