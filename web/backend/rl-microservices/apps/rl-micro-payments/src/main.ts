import {Logger} from '@nestjs/common';
import {
  boostrapErrorHandler,
  createRabbitMqConsumerMicroservice,
} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {logMicroServiceListenStart} from '@rl-config/config/log/common.log';
import dotenv from 'dotenv';

import {RlMicroPaymentsModule} from './rl-micro-payments.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger(RlMicroPaymentsModule.name);
  const app = await createRabbitMqConsumerMicroservice(
    RlMicroPaymentsModule,
    ['amqp://localhost:5672'],
    environment.paymentsService.name,
  );
  logMicroServiceListenStart(
    logger,
    environment.paymentsService.name,
    environment.paymentsService.listenAddress,
    environment.paymentsService.listenPort,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
