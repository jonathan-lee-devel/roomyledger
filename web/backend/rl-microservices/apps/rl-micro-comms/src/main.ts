import {
  boostrapErrorHandler,
  createRabbitMqConsumerMicroservice,
} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import dotenv from 'dotenv';

import {RlMicroCommsModule} from './rl-micro-comms.module';

dotenv.config();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    RlMicroCommsModule,
    [...process.env.RABBIT_MQ_URLS.split(',')],
    environment.commsService.name,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
