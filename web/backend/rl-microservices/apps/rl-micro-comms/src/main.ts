import { NestFactory } from '@nestjs/core';
import { RlMicroCommsModule } from './rl-micro-comms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { getProtoPath } from '@rl-config/config';

import dotenv from 'dotenv';
import { commsProto } from '@rl-gw';
import { COMMS_PACKAGE_NAME } from '../../rl-micro-api-gateway/src/proto/comms';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroCommsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:10001`,
        package: commsProto.COMMS_PACKAGE_NAME,
        protoPath: getProtoPath(COMMS_PACKAGE_NAME),
      },
    },
  );
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
