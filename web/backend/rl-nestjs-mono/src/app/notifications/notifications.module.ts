import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {NotificationsController} from './controllers/notifications.controller';
import {NotificationsService} from './services/notifications.service';
import {PrismaService} from '../../lib/prisma/services/prisma.service';
import {UsersService} from '../users/services/users.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(NotificationsModule.name),
    },
    NotificationsService,
    PrismaService,
    ConfigService,
    JwtService,
    UsersService,
  ],
})
export class NotificationsModule {}
