import {NestFactory} from '@nestjs/core';

import {RlMicroUsersModule} from './rl-micro-users.module';

async function bootstrap() {
  const app = await NestFactory.create(RlMicroUsersModule);
  await app.listen(3000);
}
bootstrap();
