import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {commsProto} from '@rl-gw';
import dotenv from 'dotenv';

import {RlMicroCommsModule} from './rl-micro-comms.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger(RlMicroCommsModule.name);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroCommsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `${environment.commsService.listenAddress}:${environment.commsService.listenPort}`,
        package: commsProto.COMMS_PACKAGE_NAME,
        protoPath: getProtoPath(commsProto.COMMS_PACKAGE_NAME),
      },
    },
  );
  logger.log(`Listening on port ${environment.commsService.listenPort}`);
  await app.listen();
}

bootstrap().catch((reason) => console.error(reason));
