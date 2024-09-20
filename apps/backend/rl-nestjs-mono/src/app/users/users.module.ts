import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {AuthenticatedUsersController} from './controllers/authenticated-users/authenticated-users.controller';
import {RegistrationService} from './services/registration/registration.service';
import {UserEventsHandlerService} from './services/user-events-handler/user-events-handler.service';
import {UsersService} from './services/users.service';
import {EnvironmentVariables} from '../../config/environment';
import {PrismaService} from '../../prisma/services/prisma.service';
import {MailModuleInjectionTokens} from '../mail/constants/injection-tokens';
import {MailService} from '../mail/services/mail/mail.service';
import {transporterConfig} from '../mail/transporter/transporter.config';
import {RandomService} from '../util/services/random/random.service';

@Module({
  controllers: [AuthenticatedUsersController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(UsersModule.name),
    },
    {
      provide: MailModuleInjectionTokens.NODEMAILER_TRANSPORTER,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        transporterConfig(
          configService.getOrThrow<string>(EnvironmentVariables.EMAIL_USER),
          configService.getOrThrow<string>(EnvironmentVariables.EMAIL_PASSWORD),
        ),
    },
    UsersService,
    RegistrationService,
    PrismaService,
    JwtService,
    ConfigService,
    UserEventsHandlerService,
    MailService,
    RandomService,
  ],
})
export class UsersModule {}
