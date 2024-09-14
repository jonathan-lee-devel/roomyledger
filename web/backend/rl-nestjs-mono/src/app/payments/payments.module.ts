import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {StripeService} from './_children/stripe/services/stripe.service';
import {StripeModule} from './_children/stripe/stripe.module';
import {PaymentsController} from './controllers/payments.controller';
import {PaymentsService} from './services/payments.service';
import {PrismaService} from '../../prisma/services/prisma.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(PaymentsModule.name),
    },
    PaymentsService,
    StripeService,
    ConfigService,
    PrismaService,
  ],
  imports: [StripeModule],
})
export class PaymentsModule {}
