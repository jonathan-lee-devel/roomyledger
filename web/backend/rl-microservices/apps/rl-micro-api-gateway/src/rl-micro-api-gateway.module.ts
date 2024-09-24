import {Logger, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {commsProto, paymentsProto} from '@rl-gw';
import dotenv from 'dotenv';

import {RlMicroApiGatewayController} from './rl-micro-api-gateway.controller';
import {RlMicroApiGatewayService} from './rl-micro-api-gateway.service';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: paymentsProto.PAYMENTS_PACKAGE_NAME,
        options: {
          url: `localhost:10000`,
          protoPath: getProtoPath(paymentsProto.PAYMENTS_PACKAGE_NAME),
          package: paymentsProto.PAYMENTS_PACKAGE_NAME,
        },
      },
      {
        transport: Transport.GRPC,
        name: commsProto.COMMS_PACKAGE_NAME,
        options: {
          url: `localhost:10001`,
          protoPath: getProtoPath(commsProto.COMMS_PACKAGE_NAME),
          package: commsProto.COMMS_PACKAGE_NAME,
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
