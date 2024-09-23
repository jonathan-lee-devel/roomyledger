import { Module } from '@nestjs/common';
import { RlMicroApiGatewayController } from './rl-micro-api-gateway.controller';
import { RlMicroApiGatewayService } from './rl-micro-api-gateway.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { PAYMENTS_PACKAGE_NAME } from '../../../proto/payments';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: PAYMENTS_PACKAGE_NAME,
        options: {
          protoPath: join(__dirname, '../proto/payments.proto'),
          package: PAYMENTS_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [RlMicroApiGatewayController],
  providers: [RlMicroApiGatewayService],
})
export class RlMicroApiGatewayModule {}
