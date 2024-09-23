import { NestFactory } from '@nestjs/core';
import { RlMicroPaymentsModule } from './rl-micro-payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PAYMENTS_PACKAGE_NAME } from '../../../proto/payments';

import dotenv from 'dotenv';
import { getProtoPath } from '@rl-config/config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroPaymentsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: process.env.API_GATEWAY_DOMAIN,
        package: PAYMENTS_PACKAGE_NAME,
        protoPath: getProtoPath('payments.proto'),
      },
    },
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
