import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {PrismaModule} from '@rl-prisma/prisma';

import {NotificationsService} from './services/notifications.service';

@Module({
  imports: [PrismaModule],
  controllers: [],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(NotificationsModule.name),
    },
    NotificationsService,
    ConfigService,
    JwtService,
  ],
})
export class NotificationsModule {}
