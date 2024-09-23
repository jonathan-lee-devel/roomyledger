import { NestFactory } from '@nestjs/core';
import { RlMicroLedgersModule } from './rl-micro-ledgers.module';

async function bootstrap() {
  const app = await NestFactory.create(RlMicroLedgersModule);
  await app.listen(3000);
}
bootstrap();
