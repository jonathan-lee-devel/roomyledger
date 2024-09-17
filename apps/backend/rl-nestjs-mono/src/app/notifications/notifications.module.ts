import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {NotificationsController} from './controllers/notifications.controller';
import {EventsGateway} from './gateway/events/events.gateway';
import {NotificationsService} from './services/notifications.service';
import {PrismaService} from '../../prisma/services/prisma.service';
import {UsersService} from '../users/services/users.service';

@Module({
  controllers: [NotificationsController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(NotificationsModule.name),
    },
    EventsGateway,
    NotificationsService,
    PrismaService,
    ConfigService,
    JwtService,
    UsersService,
  ],
})
export class NotificationsModule {}
