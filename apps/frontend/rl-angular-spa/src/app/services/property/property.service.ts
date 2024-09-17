import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

import {environment} from '../../../environments/environment';
import {PropertyDto} from '../../dtos/properties/Property.dto';
import {PropertyCreateRequestDto} from '../../dtos/properties/PropertyCreateRequest.dto';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private httpClient: HttpClient) {}

  public getPropertyById(propertyId: string): Observable<PropertyDto> {
    return this.httpClient.get<PropertyDto>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}/${propertyId}`,
    );
  }

  public getPropertiesWhereInvolved(): Observable<PropertyDto[]> {
    return this.httpClient.get<PropertyDto[]>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}/where-involved`,
    );
  }

  public createProperty(propertyCreateRequestDto: PropertyCreateRequestDto) {
    return this.httpClient.post<PropertyDto>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}`,
        propertyCreateRequestDto,
    );
  }

  public deletePropertyById(propertyId: string): Observable<PropertyDto> {
    return this.httpClient.delete<PropertyDto>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}/${propertyId}`,
    );
  }

  public togglePropertyAdministratorStatus(
      propertyId: string,
      emailToToggle: string,
  ): Observable<PropertyDto> {
    return this.httpClient.patch<PropertyDto>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}/${propertyId}/toggle-property-admin`,
        {email: emailToToggle},
    );
  }

  public togglePropertyTenantStatus(
      propertyId: string,
      emailToToggle: string,
  ): Observable<PropertyDto> {
    return this.httpClient.patch<PropertyDto>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}/${propertyId}/toggle-property-tenant`,
        {email: emailToToggle},
    );
  }

  public acceptPropertyInvitation(
      propertyId: string,
      tokenValue: string,
  ): Observable<PropertyDto> {
    return this.httpClient.patch<PropertyDto>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}/invitations/to-property/${propertyId}/accept`,
        {tokenValue},
    );
  }

  public inviteTenantToProperty(
      propertyId: string,
      emailToInvite: string,
  ): Observable<PropertyDto> {
    return this.httpClient.post<PropertyDto>(
        `${environment.PROPERTIES_SERVICE_BASE_URL}/invitations/to-property/${propertyId}`,
        {email: emailToInvite},
    );
  }

  private getSnackBarMessageForToggleAdministratorStatus(
      originalProperty: PropertyDto,
      updatedProperty: PropertyDto,
      combinedEmail: string,
  ) {
    const removedAdministrators = originalProperty.administrators.filter(
        (administratorEmail) =>
          updatedProperty.administrators.indexOf(administratorEmail) < 0,
    );
    return removedAdministrators.length >= 1 ?
      `${removedAdministrators[0]} has been removed as an administrator of property: ${updatedProperty.name}` :
      `${combinedEmail} has been added as an administrator of property: ${updatedProperty.name}`;
  }

  private getSnackBarMessageForToggleTenantStatus(
      originalProperty: PropertyDto,
      updatedProperty: PropertyDto,
      combinedEmail: string,
  ) {
    const removedTenants = originalProperty.tenants.filter(
        (tenantEmail) => updatedProperty.tenants.indexOf(tenantEmail) < 0,
    );
    return removedTenants.length >= 1 ?
      `${removedTenants[0]} has been removed as a tenant from the property: ${updatedProperty.name}` :
      `${combinedEmail} has been added as a tenant to the property: ${updatedProperty.name}`;
  }

  private getPromptForToggleAdministrator(
      property: PropertyDto,
      combinedEmail: string,
  ) {
    return property.administrators
        .map((administrator) => administrator.user.email)
        .includes(combinedEmail) ?
      `Do you want to remove ${combinedEmail} as an administrator of property: ${property.name}?` :
      `Do you want to add ${combinedEmail} as an administrator of property: ${property.name}?`;
  }

  private getPromptForToggleTenant(
      property: PropertyDto,
      combinedEmail: string,
  ) {
    if (
      property.administrators
          .map((administrator) => administrator.user.email)
          .includes(combinedEmail) &&
      property.tenants
          .map((tenant) => tenant.user.email)
          .includes(combinedEmail)
    ) {
      return `Do you want to remove ${combinedEmail} as a tenant of property: ${property.name}?`;
    } else if (
      !property.administrators
          .map((administrator) => administrator.user.email)
          .includes(combinedEmail) &&
      property.tenants
          .map((tenant) => tenant.user.email)
          .includes(combinedEmail)
    ) {
      return `Do you want to completely remove ${combinedEmail} from property: ${property.name}?`;
    }
    return `Do you want to add ${combinedEmail} as tenant of property: ${property.name}?`;
  }
}
