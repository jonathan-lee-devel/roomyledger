import {Logger, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {commsProto} from '@rl-gw';

import {ApplicationMessagesController} from './application-messages/application-messages.controller';
import {NotificationsController} from './notifications/notifications.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: commsProto.COMMS_PACKAGE_NAME,
        options: {
          url: `localhost:${environment.commsService.listenPort}`,
          protoPath: getProtoPath(commsProto.COMMS_PACKAGE_NAME),
          package: commsProto.COMMS_PACKAGE_NAME,
        },
      },
    ]),
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
