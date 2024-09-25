import {Logger} from '@nestjs/common';
import {
  boostrapErrorHandler,
  createRabbitMqConsumerMicroservice,
} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {logMicroServiceListenStart} from '@rl-config/config/log/common.log';
import {commsProto} from '@rl-gw';
import dotenv from 'dotenv';

import {RlMicroCommsModule} from './rl-micro-comms.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger(RlMicroCommsModule.name);
  const app = await createRabbitMqConsumerMicroservice(RlMicroCommsModule);
  logMicroServiceListenStart(
    logger,
    commsProto.COMMS_SERVICE_NAME,
    environment.commsService.listenAddress,
    environment.commsService.listenPort,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
