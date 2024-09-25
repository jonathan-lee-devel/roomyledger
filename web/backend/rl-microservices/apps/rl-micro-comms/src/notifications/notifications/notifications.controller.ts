import {Controller, Logger} from '@nestjs/common';
import {EventPattern, MessagePattern, Payload} from '@nestjs/microservices';
import {AuthenticatedNotificationById} from '@rl-config/config/micro/rabbitmq/dto/notifications/AuthenticatedNotificationById';
import {notificationsMessagePatterns} from '@rl-config/config/micro/rabbitmq/message-patterns/notifications/notifications.message.patterns';
import {RabbitmqService} from '@rl-config/config/micro/rabbitmq/services/rabbitmq.service';

import {NotificationsService} from '../services/notifications.service';

@Controller()
export class NotificationsController {
  constructor(
    private readonly logger: Logger,
    private readonly notificationsService: NotificationsService,
    private readonly rabbitMqService: RabbitmqService,
  ) {}

  @MessagePattern(notificationsMessagePatterns.getNotificationById)
  async getNotificationById(@Payload() payload: AuthenticatedNotificationById) {
    return this.notificationsService.getNotificationById(
      payload.requestingUser.email,
      payload.notificationId,
    );
  }

  @EventPattern('notification')
  handleNotification(@Payload() data: any) {
    this.logger.log(`Received notification event: `, data);
  }
}
