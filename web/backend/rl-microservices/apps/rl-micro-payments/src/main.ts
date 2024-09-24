import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {paymentsProto} from '@rl-gw';
import dotenv from 'dotenv';

import {RlMicroPaymentsModule} from './rl-micro-payments.module';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroPaymentsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${environment.paymentsService.listenAddress}:${environment.paymentsService.listenPort}`,
        package: paymentsProto.PAYMENTS_PACKAGE_NAME,
        protoPath: getProtoPath(paymentsProto.PAYMENTS_PACKAGE_NAME),
      },
    },
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
