import {Clipboard} from '@angular/cdk/clipboard';
import {AsyncPipe, NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatIconModule} from '@angular/material/icon';
import {MatTreeModule} from '@angular/material/tree';
import {AccordionModule} from 'primeng/accordion';
import {AvatarModule} from 'primeng/avatar';
import {BadgeModule} from 'primeng/badge';
import {ButtonModule} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {BehaviorSubject, Observable, of} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {PropertyDto} from '../../../../dtos/properties/Property.dto';
import {
  PropertyInvitePeopleOverlayPanelComponent,
} from '../property-invite-people-overlay-panel/property-invite-people-overlay-panel.component';

@Component({
  selector: 'app-property-dashboard-people-tab',
  standalone: true,
  imports: [
    MatExpansionModule,
    MatIconModule,
    NgIf,
    MatTreeModule,
    AsyncPipe,
    AccordionModule,
    AvatarModule,
    BadgeModule,
    ButtonModule,
    DividerModule,
    PropertyInvitePeopleOverlayPanelComponent,
  ],
  templateUrl: './property-dashboard-people-tab.component.html',
  styleUrl: './property-dashboard-people-tab.component.scss',
})
export class PropertyDashboardPeopleTabComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly propertiesStore = inject(PropertiesStore);

  isRevTagCopied$: Observable<boolean> = of(false);
  isIBANCopied$: Observable<boolean> = of(false);
  private isRevTagCopiedSubject = new BehaviorSubject<boolean>(false);
  private isIBANCopiedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly clipboard: Clipboard,
  ) {
    this.isRevTagCopied$ = this.isRevTagCopiedSubject.asObservable();
    this.isIBANCopied$ = this.isIBANCopiedSubject.asObservable();
  }

  toggleAdministrator(property: PropertyDto, combinedEmail: string) {
    this.propertiesStore.togglePropertyAdministratorStatus(property.id, combinedEmail);
  }

  toggleTenant(property: PropertyDto, combinedEmail: string) {
    this.propertiesStore.togglePropertyTenantStatus(property.id, combinedEmail);
  }

  copyRevTag(email: string) {
    const profile = this.propertiesStore.propertyByIdUsers()
        ?.find((user) => user.email === email);
    if (!profile?.profile?.revTag) {
      return;
    }
    this.clipboard.copy(profile.profile.revTag);
    this.isRevTagCopiedSubject.next(true);
    setTimeout(() => {
      this.isRevTagCopiedSubject.next(false);
    }, 1500);
  }

  copyIBAN(email: string) {
    const profile = this.propertiesStore.propertyByIdUsers()
        ?.find((user) => user.email === email);
    if (!profile?.profile?.iban) {
      return;
    }
    this.clipboard.copy(profile?.profile?.iban);
    this.isIBANCopiedSubject.next(true);
    setTimeout(() => {
      this.isIBANCopiedSubject.next(false);
    }, 1500);
  }

  isIBANAvailableForEmail(combinedEmail: string) {
    const profile = this.propertiesStore.propertyByIdUsers()?.find((user) => user.email === combinedEmail);
    return profile?.profile?.iban;
  }

  isRevTagAvailableForEmail(combinedEmail: string) {
    const profile = this.propertiesStore.propertyByIdUsers()?.find((user) => user.email === combinedEmail);
    return profile?.profile.revTag;
  }

  isEmailTenant(property: PropertyDto, combinedEmail: string) {
    return property.tenants.map((tenant) => tenant.user.email).includes(combinedEmail);
  }

  isEmailAdmin(property: PropertyDto, combinedEmail: string) {
    return property.administrators.map((administrator) => administrator.user.email).includes(combinedEmail);
  }
}
