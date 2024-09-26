import {Logger} from '@nestjs/common';
import {
  boostrapErrorHandler,
  createRabbitMqConsumerMicroservice,
} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {logMicroServiceListenStart} from '@rl-config/config/log/common.log';

import {RlMicroLedgersModule} from './rl-micro-ledgers.module';

async function bootstrap() {
  const logger = new Logger(RlMicroLedgersModule.name);
  const app = await createRabbitMqConsumerMicroservice(
    RlMicroLedgersModule,
    ['amqp://localhost:5672'],
    environment.ledgersService.name,
  );
  logMicroServiceListenStart(
    logger,
    environment.ledgersService.name,
    environment.ledgersService.listenAddress,
    environment.ledgersService.listenPort,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
