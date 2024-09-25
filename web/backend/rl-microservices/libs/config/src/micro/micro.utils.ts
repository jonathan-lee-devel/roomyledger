import {NestFactory} from '@nestjs/core';
import {MicroserviceOptions, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';

import {RlMicroApiGatewayModule} from '../../../../apps/rl-micro-api-gateway/src/rl-micro-api-gateway.module';

export const createGrpcMicroservice = async (
  module: typeof RlMicroApiGatewayModule,
  listenAddress: string,
  listenPort: string,
  protoPackageName: string,
) =>
  NestFactory.createMicroservice<MicroserviceOptions>(module, {
    transport: Transport.GRPC,
    options: {
      url: `${listenAddress}:${listenPort}`,
      package: protoPackageName,
      protoPath: getProtoPath(protoPackageName),
    },
  });
