import {NestFactory} from '@nestjs/core';

import {RlMicroApiGatewayModule} from './rl-micro-api-gateway.module';

async function bootstrap() {
  const app = await NestFactory.create(RlMicroApiGatewayModule);
  await app.listen(3000);
}
bootstrap();
