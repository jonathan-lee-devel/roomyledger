export interface NotificationDto {
  id: string;
  userId: string;
  title: string;
  extendedMessage: string;
  isAcknowledged: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
  invitationTokenValue?: string;
  propertyId?: string;
}
