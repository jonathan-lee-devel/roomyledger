import {NotificationDto} from '../dto/Notification.dto';

export interface ServerToClientNotificationEvents {
  newNotification: (payload: NotificationDto) => void;
}
