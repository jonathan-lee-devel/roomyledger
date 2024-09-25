import {Logger, Module} from '@nestjs/common';
import {PrismaModule} from '@rl-prisma/prisma';

import {ApplicationMessagesModule} from './application-messages/application-messages.module';
import {ApplicationMessagesService} from './application-messages/services/application-messages.service';
import {NotificationsModule} from './notifications/notifications.module';
import {NotificationsService} from './notifications/services/notifications.service';

@Module({
  imports: [PrismaModule, NotificationsModule, ApplicationMessagesModule],
  controllers: [],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(RlMicroCommsModule.name),
    },
    NotificationsService,
    ApplicationMessagesService,
  ],
})
export class RlMicroCommsModule {}
