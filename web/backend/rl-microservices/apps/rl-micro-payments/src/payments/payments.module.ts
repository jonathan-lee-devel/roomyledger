import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {PaymentsController} from './controllers/payments.controller';
import {PaymentsService} from './services/payments.service';
import {StripeModule} from '../stripe/stripe.module';

@Module({
  imports: [StripeModule],
  controllers: [PaymentsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(PaymentsModule.name),
    },
    PaymentsService,
    ConfigService,
  ],
})
export class PaymentsModule {}
