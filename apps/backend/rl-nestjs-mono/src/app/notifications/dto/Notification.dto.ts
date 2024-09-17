import {Dto} from '../../../dto/Dto';
import {NotificationType} from '../types/NotificationType.type';

export interface NotificationDto extends Dto {
  title: string;
  extendedMessage: string;
  type: NotificationType;
  targetUserEmail: string;
  propertyId?: string;
  propertyInvitationTokenValue?: string;
}
