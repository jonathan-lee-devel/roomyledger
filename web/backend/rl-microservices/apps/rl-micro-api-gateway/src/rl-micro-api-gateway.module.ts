import {Logger, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {commsProto, paymentsProto} from '@rl-gw';
import dotenv from 'dotenv';

import {RlMicroApiGatewayController} from './rl-micro-api-gateway.controller';
import {RlMicroApiGatewayService} from './rl-micro-api-gateway.service';
import { CommsModule } from './comms/comms.module';
import { PaymentsModule } from './payments/payments.module';
import { LedgersModule } from './ledgers/ledgers.module';
import { UsersModule } from './users/users.module';

dotenv.config();

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
    CommsModule,
    PaymentsModule,
    LedgersModule,
    UsersModule,
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
