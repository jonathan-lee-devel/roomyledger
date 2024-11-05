import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {StripeModule} from './_children/stripe/stripe.module';
import {PaymentsController} from './controllers/payments.controller';
import {PaymentsService} from './services/payments.service';
import {PrismaModule} from '../../lib/prisma/prisma.module';

@Module({
  imports: [StripeModule, PrismaModule],
  controllers: [PaymentsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(PaymentsModule.name),
    },
    PaymentsService,
    ConfigService,
  ],
  exports: [PaymentsService],
})
export class PaymentsModule {}
