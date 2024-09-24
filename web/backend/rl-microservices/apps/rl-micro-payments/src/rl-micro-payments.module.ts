import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {EventEmitterModule} from '@nestjs/event-emitter';

import {PaymentsController} from './payments/controllers/payments.controller';
import {PaymentsModule} from './payments/payments.module';
import {PaymentsService} from './payments/services/payments.service';
import {StripeController} from './stripe/controllers/stripe.controller';
import {StripeModule} from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    PaymentsModule,
    StripeModule,
  ],
  controllers: [PaymentsController, StripeController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(RlMicroPaymentsModule.name),
    },
    PaymentsService,
  ],
})
export class RlMicroPaymentsModule {}
