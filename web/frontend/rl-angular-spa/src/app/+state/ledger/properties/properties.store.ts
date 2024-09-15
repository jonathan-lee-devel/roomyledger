import {computed, inject} from '@angular/core';
import {Router} from '@angular/router';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {ConfirmationService} from 'primeng/api';
import {take, tap} from 'rxjs';

import {environment} from '../../../../environments/environment';
import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath, routePathParameters} from '../../../app.routes';
import {initialPropertyDto, PropertyDto} from '../../../dtos/properties/Property.dto';
import {PropertyCreateRequestDto} from '../../../dtos/properties/PropertyCreateRequest.dto';
import {PropertyService} from '../../../services/property/property.service';
import {ToastWrapperService} from '../../../services/toast-wrapper/toast-wrapper.service';
import {UtilService} from '../../../services/util/util.service';
import {RouterUtils} from '../../../util/router/Router.utils';
import {ExpensesStore} from '../expenses/expenses.store';

type PropertyState = {
  isLoading: boolean;
  propertiesWhereInvolved: PropertyDto[];
  propertyId: string;
  propertyById: PropertyDto;
};

const initialState: PropertyState = {
  isLoading: false,
  propertiesWhereInvolved: [],
  propertyId: '',
  propertyById: {...initialPropertyDto},
};

export const PropertiesStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const propertiesService = inject(PropertyService);
      const toastWrapperService = inject(ToastWrapperService);
      const router = inject(Router);
      return {
        loadPropertyById: (propertyId: string) => {
          patchState(store, {propertyId, isLoading: true});
          propertiesService.getPropertyById(propertyId).pipe(
              take(1),
              tap((property) => {
                patchState(store, {
                  propertyById: {...property},
                  isLoading: false,
                });
              }),
          ).subscribe();
        },
        deletePropertyById: (propertyId: string) => {
          patchState(store, {isLoading: true});
          propertiesService.deletePropertyById(propertyId).pipe(
              take(1),
              tap((deletedProperty) => {
                patchState(store, {
                  propertiesWhereInvolved: [
                    ...store.propertiesWhereInvolved()
                        .filter((property) => property.id !== deletedProperty.id),
                  ],
                  isLoading: false,
                });
                toastWrapperService.showToast(
                    'Property Deleted',
                    `Property with name: ${deletedProperty.name} has successfully been deleted`,
                    false,
                    true,
                    'info',
                    environment.TOAST_DURATION_MS,
                );
                router
                    .navigate([rebaseRoutePath(RoutePath.LEDGERS_MANAGE)])
                    .catch(RouterUtils.navigateCatchErrorCallback);
              }),
          ).subscribe();
        },
      };
    }),
    withMethods((store) => {
      const propertiesService = inject(PropertyService);
      const toastWrapperService = inject(ToastWrapperService);
      const router = inject(Router);
      const expensesStore = inject(ExpensesStore);
      const utilService = inject(UtilService);
      const confirmationService = inject(ConfirmationService);
      return {
        clearProperties: () => {
          patchState(store, {
            ...initialState,
          });
        },
        loadPropertiesWhereInvolved: () => {
          patchState(store, {isLoading: true});
          propertiesService.getPropertiesWhereInvolved().pipe(
              take(1),
              tap((properties) => {
                patchState(store, {propertiesWhereInvolved: [...properties], isLoading: false});
              }),
          ).subscribe();
        },
        createProperty: (propertyCreateRequest: PropertyCreateRequestDto) => {
          patchState(store, {isLoading: true});
          propertiesService.createProperty(propertyCreateRequest).pipe(
              take(1),
              tap((createdProperty) => {
                patchState(store, {
                  propertyById: {...createdProperty},
                  propertiesWhereInvolved: [...store.propertiesWhereInvolved(),
                    createdProperty],
                  isLoading: false,
                });
                expensesStore.loadExpensesForProperty(createdProperty.id, {
                  startDate: utilService.formatDate(utilService.getFirstDayOfMonthForDate(new Date())),
                  endDate: utilService.formatDate(utilService.getLastDayOfMonthForDate(new Date())),
                });
                toastWrapperService.showToast(
                    'Property Created',
                    `Property with name: ${createdProperty.name} created successfully`,
                    false,
                    true,
                    'info',
                    10_000,
                );
                router
                    .navigate([
                      rebaseRoutePathAsString(
                          RoutePath.LEDGERS_DASHBOARD_ID.replace(
                              routePathParameters.PROPERTY_ID,
                              createdProperty.id,
                          ),
                      ),
                    ])
                    .catch(RouterUtils.navigateCatchErrorCallback);
              }),
          ).subscribe();
        },
        promptDeletePropertyById: (propertyId: string) => {
          let property = store.propertiesWhereInvolved()
              .find((property) => property.id === propertyId);
          if (!property) {
            store.loadPropertyById(propertyId);
            property = store.propertyById();
            return;
          }
          confirmationService.confirm({
            header: `Delete Property: ${property.name} ?`,
            message: `Are you sure you want to delete ${property.name} ?`,
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'pi pi-trash',
            acceptLabel: '  Delete',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            accept: () => store.deletePropertyById(property.id),
          });
        },
        togglePropertyAdministratorStatus: (propertyId: string, emailToToggle: string) => {
          patchState(store, {isLoading: true});
          propertiesService.togglePropertyAdministratorStatus(propertyId, emailToToggle).pipe(
              take(1),
              tap((property) => {
                patchState(store, {
                  propertyById: {...property},
                  propertiesWhereInvolved: [
                    ...store.propertiesWhereInvolved()
                        .filter((property) => property.id !== propertyId),
                    property,
                  ],
                  isLoading: false,
                });
              }),
          ).subscribe();
        },
        togglePropertyTenantStatus: (propertyId: string, emailToToggle: string) => {
          patchState(store, {isLoading: true});
          propertiesService.togglePropertyTenantStatus(propertyId, emailToToggle).pipe(
              take(1),
              tap((property) => {
                patchState(store, {
                  propertyById: {...property},
                  propertiesWhereInvolved: [
                    ...store.propertiesWhereInvolved()
                        .filter((property) => property.id !== propertyId),
                    property,
                  ],
                  isLoading: false,
                });
              }),
          ).subscribe();
        },
        inviteTenantToProperty: (propertyId: string, emailToInvite: string) => {
          patchState(store, {isLoading: true});
          propertiesService.inviteTenantToProperty(propertyId, emailToInvite).pipe(
              take(1),
              tap((updatedProperty) => {
                patchState(store, {
                  propertyById: {...updatedProperty},
                  propertiesWhereInvolved: [
                    ...store.propertiesWhereInvolved()
                        .filter((property) => property.id !== propertyId),
                    updatedProperty,
                  ],
                  isLoading: false,
                });
                toastWrapperService.showToast(
                    'Tenant Invited',
                    `Successfully invited tenant to ${updatedProperty.name}`,
                    false,
                    true,
                    'info',
                    10_000,
                );
                router
                    .navigate([
                      rebaseRoutePathAsString(
                          RoutePath.LEDGERS_DASHBOARD_ID.replace(
                              routePathParameters.PROPERTY_ID,
                              updatedProperty.id,
                          ),
                      ),
                    ])
                    .catch(RouterUtils.navigateCatchErrorCallback);
              }),
          ).subscribe();
        },
        acceptPropertyInvitation: (propertyId: string, tokenValue: string) => {
          patchState(store, {isLoading: true});
          propertiesService.acceptPropertyInvitation(propertyId, tokenValue).pipe(
              take(1),
              tap((updatedProperty) => {
                patchState(store, {
                  propertyById: {...updatedProperty},
                  propertiesWhereInvolved: [
                    ...store.propertiesWhereInvolved()
                        .filter((property) => property.id !== propertyId),
                    updatedProperty,
                  ],
                  isLoading: false,
                });
                toastWrapperService.showConfirmMessage(
                    'Property Invitation Accepted',
                    `You are now a member of property: ${updatedProperty.name}`,
                    false,
                    true,
                    'info',
                    10_000,
                );
                router
                    .navigate([
                      rebaseRoutePathAsString(
                          RoutePath.LEDGERS_DASHBOARD_ID.replace(
                              routePathParameters.PROPERTY_ID,
                              updatedProperty.id,
                          ),
                      ),
                    ])
                    .catch(RouterUtils.navigateCatchErrorCallback);
              }),
          ).subscribe();
        },
      };
    }),
    withComputed((store) => {
      return {
        propertiesWhereInvolvedCount: computed(() => store.propertiesWhereInvolved().length),
        propertyByIdCombinedEmails: computed(() => {
          const propertyAdministratorEmails = store.propertyById().administrators
              .map((administrator) => administrator.user.email);
          const tenantEmails = store.propertyById().tenants
              .map((tenant) => tenant.user.email);
          return new Set<string>([...propertyAdministratorEmails, ...tenantEmails]);
        }),
        propertyByIdUsers: computed(() => Array.from(new Set([
          ...store.propertyById().administrators.map((administrator) => administrator.user),
          ...store.propertyById().tenants.map((tenant) => tenant.user),
        ]))),
      };
    }),
    withComputed((store) => {
      return {
        propertyByIdCombinedEmailsAndUsers: computed(() => {
          const emails = store.propertyByIdCombinedEmails();
          const users = store.propertyByIdUsers();
          return Array.from(emails)
              .map((email) => ({
                email,
                user: users.find((user) => user.email === email),
              }));
        }),
      };
    }),
);
