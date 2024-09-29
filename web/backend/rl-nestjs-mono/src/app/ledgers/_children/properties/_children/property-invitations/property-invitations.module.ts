import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {PropertyInvitationsController} from './controllers/property-invitations.controller';
import {InvitationsEventsHandlerService} from './services/invitations-events-handler/invitations-events-handler.service';
import {PropertyInvitationsService} from './services/property-invitations.service';
import {PrismaService} from '../../../../../../lib/prisma/services/prisma.service';
import {RandomService} from '../../../../../../lib/util/services/random/random.service';
import {NotificationsService} from '../../../../../notifications/services/notifications.service';
import {StripeService} from '../../../../../payments/_children/stripe/services/stripe.service';
import {PaymentsService} from '../../../../../payments/services/payments.service';
import {UsersService} from '../../../../../users/services/users.service';
import {PropertiesService} from '../../services/properties.service';

@Module({
  controllers: [PropertyInvitationsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(PropertyInvitationsModule.name),
    },
    PropertyInvitationsService,
    InvitationsEventsHandlerService,
    PropertiesService,
    PrismaService,
    UsersService,
    RandomService,
    PaymentsService,
    StripeService,
    ConfigService,
    NotificationsService,
  ],
})
export class PropertyInvitationsModule {}
