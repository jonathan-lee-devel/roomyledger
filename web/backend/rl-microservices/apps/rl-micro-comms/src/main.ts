import {Logger} from '@nestjs/common';
import {
  boostrapErrorHandler,
  createRabbitMqConsumerMicroservice,
} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {logMicroServiceListenStart} from '@rl-config/config/log/common.log';
import dotenv from 'dotenv';

import {RlMicroCommsModule} from './rl-micro-comms.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger(RlMicroCommsModule.name);
  const app = await createRabbitMqConsumerMicroservice(
    RlMicroCommsModule,
    ['amqp://localhost:5672'],
    environment.commsService.name,
  );
  logMicroServiceListenStart(
    logger,
    environment.commsService.name,
    environment.commsService.listenAddress,
    environment.commsService.listenPort,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
