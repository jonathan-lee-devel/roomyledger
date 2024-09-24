import {Logger, Module} from '@nestjs/common';
import {ClientsModule, Transport} from '@nestjs/microservices';
import {getProtoPath} from '@rl-config/config';
import {environment} from '@rl-config/config/environment.index';
import {paymentsProto} from '@rl-gw';

import {CustomersController} from './customers/customers.controller';
import {StripeController} from './stripe/stripe.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.GRPC,
        name: paymentsProto.PAYMENTS_PACKAGE_NAME,
        options: {
          url: `localhost:${environment.paymentsService.listenPort}`,
          protoPath: getProtoPath(paymentsProto.PAYMENTS_PACKAGE_NAME),
          package: paymentsProto.PAYMENTS_PACKAGE_NAME,
        },
      },
    ]),
  ],
  controllers: [CustomersController, StripeController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(PaymentsModule.name),
    },
  ],
})
export class PaymentsModule {}
