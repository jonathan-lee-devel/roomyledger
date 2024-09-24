import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PrismaModule} from '@rl-prisma/prisma';

import {StripeController} from './controllers/stripe.controller';
import {StripeWebhookEventsHandlerService} from './services/stripe-webhook-events-handler/stripe-webhook-events-handler.service';
import {StripeService} from './services/stripe.service';

@Module({
  imports: [PrismaModule],
  controllers: [StripeController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(StripeModule.name),
    },
    StripeService,
    StripeWebhookEventsHandlerService,
    ConfigService,
  ],
  exports: [StripeService],
})
export class StripeModule {}
