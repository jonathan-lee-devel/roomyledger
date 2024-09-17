import {NotificationType} from '../../enums/NotificationType.enum';

export interface NotificationDto {
  id: string;
  title: string;
  extendedMessage: string;
  targetUserEmail: string;
  isAcknowledged: boolean;
  type: NotificationType;
  propertyId?: string;
  invitationTokenValue?: string;
  createdAt: string;
  updatedAt: string;
}
