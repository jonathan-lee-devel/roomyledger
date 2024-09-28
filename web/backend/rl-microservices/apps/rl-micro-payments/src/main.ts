import {
  boostrapErrorHandler,
  createRabbitMqConsumerMicroservice,
} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import dotenv from 'dotenv';

import {RlMicroPaymentsModule} from './rl-micro-payments.module';

dotenv.config();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    RlMicroPaymentsModule,
    [...process.env.RABBIT_MQ_URLS.split(',')],
    environment.paymentsService.name,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
