import { NestFactory } from '@nestjs/core';
import { RlMicroCommsModule } from './rl-micro-comms.module';

async function bootstrap() {
  const app = await NestFactory.create(RlMicroCommsModule);
  await app.listen(3000);
}
bootstrap();
