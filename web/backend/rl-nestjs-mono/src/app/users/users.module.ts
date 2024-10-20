import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {AuthenticatedUsersController} from './controllers/authenticated-users/authenticated-users.controller';
import {UserEventsHandlerService} from './services/user-events-handler/user-events-handler.service';
import {UsersService} from './services/users.service';
import {PrismaModule} from '../../lib/prisma/prisma.module';
import {UtilModule} from '../../lib/util/util.module';
import {MailModule} from '../mail/mail.module';
import {RegistrationService} from './services/registration/registration.service';

@Module({
  imports: [UtilModule, PrismaModule, MailModule, ConfigModule],
  controllers: [AuthenticatedUsersController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(UsersModule.name),
    },
    JwtService,
    UserEventsHandlerService,
    UsersService,
    RegistrationService,
  ],
  exports: [UsersService, RegistrationService],
})
export class UsersModule {}
