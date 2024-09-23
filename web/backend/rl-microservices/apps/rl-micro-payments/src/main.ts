import { NestFactory } from '@nestjs/core';
import { RlMicroPaymentsModule } from './rl-micro-payments.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PAYMENTS_PACKAGE_NAME } from '../../../proto/payments';
import { join } from 'path';

import dotenv from 'dotenv';

dotenv.config();

function getProtoPath() {
  return process.env.NODE_ENV === 'production'
    ? 'dist/apps/proto/payments.proto'
    : join(__dirname, '../proto/payments.proto');
}

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroPaymentsModule,
    {
      transport: Transport.GRPC,
      options: {
        package: PAYMENTS_PACKAGE_NAME,
        protoPath: getProtoPath(),
      },
    },
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
