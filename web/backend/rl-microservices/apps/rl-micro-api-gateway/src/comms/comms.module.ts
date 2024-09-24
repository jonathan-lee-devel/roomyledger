import { Module } from '@nestjs/common';
import { ApplicationMessagesController } from './application-messages/application-messages.controller';
import { NotificationsController } from './notifications/notifications.controller';

@Module({
  controllers: [ApplicationMessagesController, NotificationsController]
})
export class CommsModule {}
