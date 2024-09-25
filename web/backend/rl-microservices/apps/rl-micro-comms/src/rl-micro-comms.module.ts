import {Logger, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {paymentsProto} from '@rl-gw';
import {PrismaModule} from '@rl-prisma/prisma';

import {CommsController} from './comms/comms.controller';
import {CommsService} from './comms/comms.service';
import {NotificationsService} from './notifications/services/notifications.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: paymentsProto.PAYMENTS_PACKAGE_NAME,
        options: {
          url: `${process.env.PAYMENTS_SERVICE_DOMAIN}:${environment.paymentsService.listenPort}`,
          protoPath: getProtoPath(paymentsProto.PAYMENTS_PACKAGE_NAME),
          package: paymentsProto.PAYMENTS_PACKAGE_NAME,
        },
      },
    ]),
    PrismaModule,
  ],
  controllers: [CommsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(RlMicroCommsModule.name),
    },
    CommsService,
    NotificationsService,
  ],
})
export class RlMicroCommsModule {}
