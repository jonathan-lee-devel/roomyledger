import {Logger} from '@nestjs/common';
import {boostrapErrorHandler, createGrpcMicroservice} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {logMicroServiceListenStart} from '@rl-config/config/log/common.log';
import {paymentsProto} from '@rl-gw';
import dotenv from 'dotenv';

import {RlMicroPaymentsModule} from './rl-micro-payments.module';

dotenv.config();

async function bootstrap() {
  const logger = new Logger(RlMicroPaymentsModule.name);
  const app = await createGrpcMicroservice(
    RlMicroPaymentsModule,
    environment.paymentsService.listenAddress,
    environment.paymentsService.listenPort,
    paymentsProto.PAYMENTS_PACKAGE_NAME,
  );
  logMicroServiceListenStart(
    logger,
    paymentsProto.PAYMENTS_SERVICE_NAME,
    environment.paymentsService.listenAddress,
    environment.paymentsService.listenPort,
  );
  await app.listen();
}

bootstrap().catch(boostrapErrorHandler);
