import { NestFactory } from '@nestjs/core';
import { RlMicroCommsModule } from './rl-micro-comms.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { PAYMENTS_PACKAGE_NAME } from '../../../proto/payments';
import { getProtoPath } from '@rl-config/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    RlMicroCommsModule,
    {
      transport: Transport.GRPC,
      options: {
        url: `0.0.0.0:10001`,
        package: PAYMENTS_PACKAGE_NAME,
        protoPath: getProtoPath('payments.proto'),
      },
    },
  );
  await app.listen();
}
bootstrap();
