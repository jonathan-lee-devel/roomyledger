import { NestFactory } from '@nestjs/core';
import { RlMicroCommsModule } from './rl-micro-comms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getProtoPath } from '@rl-config/config';

import dotenv from 'dotenv';
import { COMMS_PACKAGE_NAME } from '../../rl-micro-api-gateway/src/proto/comms';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroCommsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:10001`,
        package: COMMS_PACKAGE_NAME,
        protoPath: getProtoPath('comms.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
