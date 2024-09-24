import { Logger, Module } from '@nestjs/common';
import { CommsController } from './comms/comms.controller';
import { CommsService } from './comms/comms.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PAYMENTS_PACKAGE_NAME } from '../../rl-micro-api-gateway/src/proto/payments';
import { getProtoPath } from '@rl-config/config';
import { paymentsProto } from '@rl-gw';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: PAYMENTS_PACKAGE_NAME,
        options: {
          url: `localhost:10000`,
          protoPath: getProtoPath(paymentsProto.PAYMENTS_PACKAGE_NAME),
          package: PAYMENTS_PACKAGE_NAME,
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
