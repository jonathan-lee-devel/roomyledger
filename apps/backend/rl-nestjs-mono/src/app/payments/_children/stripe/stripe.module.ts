import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {StripeController} from './controllers/stripe.controller';
import {StripeWebhookEventsHandlerService} from './services/stripe-webhook-events-handler/stripe-webhook-events-handler.service';
import {StripeService} from './services/stripe.service';
import {PrismaService} from '../../../../prisma/services/prisma.service';

@Module({
  controllers: [StripeController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(StripeModule.name),
    },
    StripeService,
    StripeWebhookEventsHandlerService,
    ConfigService,
    PrismaService,
  ],
})
export class StripeModule {}
