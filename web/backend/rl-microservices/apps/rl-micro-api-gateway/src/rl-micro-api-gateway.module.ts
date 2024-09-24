import { Logger, Module } from '@nestjs/common';
import { RlMicroApiGatewayController } from './rl-micro-api-gateway.controller';
import { RlMicroApiGatewayService } from './rl-micro-api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getProtoPath } from '@rl-config/config';

import dotenv from 'dotenv';
import { PAYMENTS_PACKAGE_NAME } from './proto/payments';
import { COMMS_PACKAGE_NAME } from './proto/comms';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: PAYMENTS_PACKAGE_NAME,
        options: {
          url: `localhost:10000`,
          protoPath: getProtoPath('payments.proto'),
          package: PAYMENTS_PACKAGE_NAME,
        },
      },
      {
        transport: Transport.GRPC,
        name: COMMS_PACKAGE_NAME,
        options: {
          url: `localhost:10001`,
          protoPath: getProtoPath('comms.proto'),
          package: COMMS_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [RlMicroApiGatewayController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(RlMicroApiGatewayModule.name),
    },
    RlMicroApiGatewayService,
  ],
})
export class RlMicroApiGatewayModule {}
