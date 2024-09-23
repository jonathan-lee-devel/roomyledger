import { Module } from '@nestjs/common';
import { RlMicroApiGatewayController } from './rl-micro-api-gateway.controller';
import { RlMicroApiGatewayService } from './rl-micro-api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PAYMENTS_PACKAGE_NAME } from '../../../proto/payments';
import { getProtoPath } from '@rl-config/config';

import dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: PAYMENTS_PACKAGE_NAME,
        options: {
          url: `grpc://${process.env.PAYMENTS_SERVICE_DOMAIN}:5000`,
          protoPath: getProtoPath('payments.proto'),
          package: PAYMENTS_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [RlMicroApiGatewayController],
  providers: [RlMicroApiGatewayService],
})
export class RlMicroApiGatewayModule {}
