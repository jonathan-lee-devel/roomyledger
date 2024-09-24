import {Logger, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {paymentsProto} from '@rl-gw';

import {CommsController} from './comms/comms.controller';
import {CommsService} from './comms/comms.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: paymentsProto.PAYMENTS_PACKAGE_NAME,
        options: {
          url: `localhost:${environment.paymentsService.listenPort}`,
          protoPath: getProtoPath(paymentsProto.PAYMENTS_PACKAGE_NAME),
          package: paymentsProto.PAYMENTS_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [CommsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(RlMicroCommsModule.name),
    },
    CommsService,
  ],
})
export class RlMicroCommsModule {}
