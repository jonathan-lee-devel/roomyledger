import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';

import {RlMicroApiGatewayModule} from '../../../../apps/rl-micro-api-gateway/src/rl-micro-api-gateway.module';

export const createRabbitMqConsumerMicroservice = async (
  module: typeof RlMicroApiGatewayModule,
  rabbitMqUrls: string[],
  queueName: string,
) => {
  return NestFactory.createMicroservice<MicroserviceOptions>(module, {
    transport: Transport.RMQ,
    options: {
      urls: rabbitMqUrls,
      queue: queueName,
      queueOptions: {
        durable: true,
      },
    },
  });
};
