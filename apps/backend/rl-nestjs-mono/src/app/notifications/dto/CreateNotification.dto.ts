import {NotificationType} from '../types/NotificationType.type';

export interface CreateNotificationDto {
  title: string;
  extendedMessage: string;
  type: NotificationType;
  targetUserEmail: string;
  propertyId?: string;
  propertyInvitationTokenValue?: string;
}
