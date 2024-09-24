import { NestFactory } from '@nestjs/core';
import { RlMicroPaymentsModule } from './rl-micro-payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

import dotenv from 'dotenv';
import { getProtoPath } from '@rl-config/config';
import { paymentsProto } from '@rl-gw';
import { PAYMENTS_PACKAGE_NAME } from '../../rl-micro-api-gateway/src/proto/payments';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroPaymentsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:10000`,
        package: paymentsProto.PAYMENTS_PACKAGE_NAME,
        protoPath: getProtoPath(PAYMENTS_PACKAGE_NAME),
      },
    },
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
