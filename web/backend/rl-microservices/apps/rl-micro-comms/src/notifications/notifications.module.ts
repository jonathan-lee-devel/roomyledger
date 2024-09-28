import {Logger, Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {RabbitmqModule} from '@rl-config/config/micro/rabbitmq/rabbitmq.module';
import {PrismaModule} from '@rl-prisma/prisma';

import {NotificationsController} from './controllers/notifications/notifications.controller';
import {NotificationsService} from './services/notifications.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    RabbitmqModule,
    PrismaModule,
  ],
  controllers: [NotificationsController],
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
