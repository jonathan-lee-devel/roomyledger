import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {PropertyInvitationsModule} from './_children/property-invitations/property-invitations.module';
import {PropertiesController} from './controllers/properties.controller';
import {PropertiesService} from './services/properties.service';
import {PrismaService} from '../../../../prisma/services/prisma.service';
import {StripeService} from '../../../payments-grpc/_children/stripe/services/stripe.service';
import {PaymentsService} from '../../../payments-grpc/services/payments-grpc.service';
import {RegistrationService} from '../../../users/services/registration/registration.service';
import {UsersService} from '../../../users/services/users.service';
import {RandomService} from '../../../util/services/random/random.service';

@Module({
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
  imports: [PropertyInvitationsModule],
})
export class PropertiesModule {}
