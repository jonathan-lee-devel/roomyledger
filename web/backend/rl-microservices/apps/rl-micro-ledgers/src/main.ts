import {
  boostrapErrorHandler,
  createRabbitMqConsumerMicroservice,
} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import dotenv from 'dotenv';

import {RlMicroLedgersModule} from './rl-micro-ledgers.module';

dotenv.config();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    RlMicroLedgersModule,
    [[...process.env.RABBIT_MQ_URLS.split(',')]],
    environment.ledgersService.name,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
