import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

import {environment} from '../../../environments/environment';
import {NotificationDto} from '../../dtos/notifications/Notification.dto';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllNotificationsForUser() {
    return this.httpClient.get<NotificationDto[]>(
        `${environment.NOTIFICATIONS_SERVICE_BASE_URL}/for-user`,
    );
  }

  acknowledgeAllNotificationsForUser() {
    return this.httpClient.patch<NotificationDto[]>(
        `${environment.NOTIFICATIONS_SERVICE_BASE_URL}/for-user`,
        {},
    );
  }

  deleteAllNotificationsForUser() {
    return this.httpClient.delete<NotificationDto[]>(
        `${environment.NOTIFICATIONS_SERVICE_BASE_URL}/for-user`,
    );
  }

  acknowledgeNotificationById(notificationId: string) {
    return this.httpClient.patch<NotificationDto>(
        `${environment.NOTIFICATIONS_SERVICE_BASE_URL}/${notificationId}`,
        {},
    );
  }

  deleteNotificationById(notificationId: string) {
    return this.httpClient.delete<NotificationDto>(
        `${environment.NOTIFICATIONS_SERVICE_BASE_URL}/${notificationId}`,
    );
  }
}
