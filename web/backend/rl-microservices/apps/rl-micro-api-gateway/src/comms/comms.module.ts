import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {RabbitmqModule} from '@rl-config/config/micro/rabbitmq/rabbitmq.module';

import {ApplicationMessagesController} from './application-messages/application-messages.controller';
import {NotificationsController} from './notifications/notifications.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitmqModule.register({serviceName: 'COMMS'}),
  ],
  controllers: [ApplicationMessagesController, NotificationsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(CommsModule.name),
    },
  ],
})
export class CommsModule {}
