import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {PropertyInvitationsModule} from './_children/property-invitations/property-invitations.module';
import {PropertiesController} from './controllers/properties.controller';
import {PropertiesService} from './services/properties.service';
import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {RandomService} from '../../../../lib/util/services/random/random.service';
import {StripeService} from '../../../payments/_children/stripe/services/stripe.service';
import {PaymentsService} from '../../../payments/services/payments.service';
import {RegistrationService} from '../../../users/services/registration/registration.service';
import {UsersService} from '../../../users/services/users.service';

@Module({
  imports: [PropertyInvitationsModule],
  controllers: [PropertiesController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(PropertiesModule.name),
    },
    PropertiesService,
    PrismaService,
    UsersService,
    JwtService,
    ConfigService,
    RegistrationService,
    RandomService,
    PaymentsService,
    StripeService,
  ],
  exports: [PropertiesService],
})
export class PropertiesModule {}
