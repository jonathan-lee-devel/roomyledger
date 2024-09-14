import {computed, inject} from '@angular/core';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import {ConfirmationService} from 'primeng/api';
import {take, tap} from 'rxjs';

import {NotificationDto} from '../../dtos/notifications/Notification.dto';
import {NotificationService} from '../../services/notification/notification.service';

type NotificationsState = {
  notifications: NotificationDto[];
  isLoading: boolean;
};

const initialState: NotificationsState = {
  notifications: [] as NotificationDto[],
  isLoading: false,
};

export const NotificationsStore = signalStore(
    {providedIn: 'root'},
    withState(initialState),
    withMethods((store) => {
      const notificationsService = inject(NotificationService);
      return {
        deleteAllNotificationsForUser: () => {
          patchState(store, {isLoading: true});
          notificationsService.deleteAllNotificationsForUser().pipe(
              take(1),
              tap(() => {
                patchState(store, {isLoading: false, notifications: []});
              }),
          ).subscribe();
        },
      };
    }),
    withMethods((store) => {
      const notificationsService = inject(NotificationService);
      const confirmationService = inject(ConfirmationService);
      return {
        loadNotifications: () => {
          patchState(store, {isLoading: true});
          notificationsService.getAllNotificationsForUser().pipe(
              take(1),
              tap((notifications) => {
                patchState(store, {notifications, isLoading: false});
              }),
          ).subscribe();
        },
        unloadNotifications: () => {
          patchState(store, {notifications: [], isLoading: false});
        },
        acknowledgeNotificationById: (notificationId: string) => {
          patchState(store, {isLoading: true});
          notificationsService.acknowledgeNotificationById(notificationId).pipe(
              take(1),
              tap((notification) => {
                const notifications = store.notifications()
                    .filter((notification) =>
                      notification.id !== notificationId);
                notifications.push(notification);
                patchState(store, {notifications: [...notifications], isLoading: false});
              }),
          ).subscribe();
        },
        deleteNotificationById: (notificationId: string) => {
          patchState(store, {isLoading: true});
          notificationsService.deleteNotificationById(notificationId).pipe(
              take(1),
              tap(() => {
                const notifications = store.notifications()
                    .filter((notification) =>
                      notification.id !== notificationId);
                patchState(store, {notifications: [...notifications], isLoading: false});
              }),
          ).subscribe();
        },
        acknowledgeAllNotificationsForUser: () => {
          patchState(store, {isLoading: true});
          notificationsService.acknowledgeAllNotificationsForUser().pipe(
              take(1),
              tap((notifications) => {
                patchState(store, {notifications: [...notifications], isLoading: false});
              }),
          ).subscribe();
        },
        promptDeleteAllNotificationsForUser: () => {
          confirmationService.confirm({
            header: `Delete all notifications ?`,
            message: `Are you sure you want to delete all notifications ?`,
            icon: 'pi pi-exclamation-triangle',
            acceptIcon: 'pi pi-trash',
            acceptLabel: '  Delete',
            acceptButtonStyleClass: 'p-button-danger p-button-text',
            accept: () => {
              store.deleteAllNotificationsForUser();
            },
          });
        },
      };
    }),
    withComputed(({notifications}) => {
      return {
        unacknowledgedNotifications: computed(() => notifications().filter((notification) => !notification.isAcknowledged)),
        unacknowledgedNotificationsCount: computed(() => notifications().filter((notification) => !notification.isAcknowledged).length),
      };
    }),
);
