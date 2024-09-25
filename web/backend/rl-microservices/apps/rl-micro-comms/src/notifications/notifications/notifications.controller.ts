import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {ByAuthenticatedUserDto} from '@rl-config/config/micro/rabbitmq/dto/common/ByAuthenticatedUser.dto';
import {AuthenticatedNotificationById} from '@rl-config/config/micro/rabbitmq/dto/notifications/AuthenticatedNotificationById';
import {notificationsMessagePatterns} from '@rl-config/config/micro/rabbitmq/message-patterns/notifications/notifications.message.patterns';

import {NotificationsService} from '../services/notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern(notificationsMessagePatterns.getAllNotificationsForUser)
  async getAllNotificationsForUser(@Payload() payload: ByAuthenticatedUserDto) {
    return this.notificationsService.getAllNotificationsForUser(
      payload.requestingUser.email,
    );
  }

  @MessagePattern(
    notificationsMessagePatterns.acknowledgeAllNotificationsForUser,
  )
  async acknowledgeAllNotificationsForUser(
    @Payload() payload: ByAuthenticatedUserDto,
  ) {
    return this.notificationsService.acknowledgeAllNotificationsForUser(
      payload.requestingUser.email,
    );
  }

  @MessagePattern(notificationsMessagePatterns.deleteAllNotificationsForUser)
  async deleteAllNotificationsForUser(
    @Payload() payload: ByAuthenticatedUserDto,
  ) {
    return this.notificationsService.deleteAllNotificationsForUser(
      payload.requestingUser.email,
    );
  }

  @MessagePattern(notificationsMessagePatterns.getNotificationById)
  async getNotificationById(@Payload() payload: AuthenticatedNotificationById) {
    return this.notificationsService.getNotificationById(
      payload.requestingUser.email,
      payload.notificationId,
    );
  }

  @MessagePattern(notificationsMessagePatterns.acknowledgeNotificationById)
  async acknowledgeNotificationById(
    @Payload() payload: AuthenticatedNotificationById,
  ) {
    return this.notificationsService.acknowledgeNotificationById(
      payload.requestingUser.email,
      payload.notificationId,
    );
  }

  @MessagePattern(notificationsMessagePatterns.deleteNotificationById)
  async deleteNotificationById(
    @Payload() payload: AuthenticatedNotificationById,
  ) {
    return this.notificationsService.deleteNotificationById(
      payload.requestingUser.email,
      payload.notificationId,
    );
  }
}
