import {Controller, Delete, Get, Inject, Param, Patch} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {CurrentUser} from '@rl-auth/auth/supabase/decorators/current-user.decorator';
import {ByAuthenticatedUserDto} from '@rl-config/config/micro/rabbitmq/dto/common/ByAuthenticatedUser.dto';
import {AuthenticatedNotificationById} from '@rl-config/config/micro/rabbitmq/dto/notifications/AuthenticatedNotificationById';
import {NotificationDto} from '@rl-config/config/micro/rabbitmq/dto/notifications/Notification.dto';
import {notificationsMessagePatterns} from '@rl-config/config/micro/rabbitmq/message-patterns/notifications/notifications.message.patterns';
import {IdParamDto} from '@rl-validation/validation';
import {AuthUser} from '@supabase/supabase-js';

@ApiTags('Comms')
@Controller('notifications')
export class NotificationsController {
  constructor(@Inject('COMMS') private readonly commsClient: ClientProxy) {}

  @Get('for-user')
  getAllForUser(@CurrentUser() currentUser: AuthUser) {
    const payload: ByAuthenticatedUserDto = {
      requestingUser: currentUser,
    };
    return this.commsClient.send<NotificationDto[], ByAuthenticatedUserDto>(
      notificationsMessagePatterns.getAllNotificationsForUser,
      payload,
    );
  }

  @Patch('for-user')
  async acknowledgeAllForUser(@CurrentUser() currentUser: AuthUser) {
    const payload: ByAuthenticatedUserDto = {
      requestingUser: currentUser,
    };
    return this.commsClient.send<NotificationDto[], ByAuthenticatedUserDto>(
      notificationsMessagePatterns.acknowledgeAllNotificationsForUser,
      payload,
    );
  }

  @Delete('for-user')
  async deleteAllForUser(@CurrentUser() currentUser: AuthUser) {
    const payload: ByAuthenticatedUserDto = {
      requestingUser: currentUser,
    };
    return this.commsClient.send<NotificationDto[], ByAuthenticatedUserDto>(
      notificationsMessagePatterns.deleteAllNotificationsForUser,
      payload,
    );
  }

  @Get(':id')
  async getNotificationById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    const payload: AuthenticatedNotificationById = {
      requestingUser: currentUser,
      notificationId: id,
    };
    return this.commsClient.send<
      NotificationDto,
      AuthenticatedNotificationById
    >(notificationsMessagePatterns.getNotificationById, payload);
  }

  @Patch(':id')
  async acknowledgeNotificationById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    const payload: AuthenticatedNotificationById = {
      requestingUser: currentUser,
      notificationId: id,
    };
    return this.commsClient.send<
      NotificationDto,
      AuthenticatedNotificationById
    >(notificationsMessagePatterns.acknowledgeNotificationById, payload);
  }

  @Delete(':id')
  deleteNotificationById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    const payload: AuthenticatedNotificationById = {
      requestingUser: currentUser,
      notificationId: id,
    };
    return this.commsClient.send<
      NotificationDto,
      AuthenticatedNotificationById
    >(notificationsMessagePatterns.deleteNotificationById, payload);
  }
}
