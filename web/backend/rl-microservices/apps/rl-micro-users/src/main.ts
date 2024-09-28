import {createRabbitMqConsumerMicroservice} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import dotenv from 'dotenv';

import {RlMicroPaymentsModule} from '../../rl-micro-payments/src/rl-micro-payments.module';

dotenv.config();

async function bootstrap() {
  const app = await createRabbitMqConsumerMicroservice(
    RlMicroPaymentsModule,
    [[...process.env.RABBIT_MQ_URLS.split(',')]],
    environment.usersService.name,
  );
  await app.listen();
}
bootstrap();
