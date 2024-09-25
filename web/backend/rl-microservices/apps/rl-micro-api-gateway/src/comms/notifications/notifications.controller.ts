import {Controller, Delete, Get, Inject, Param, Patch} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {CurrentUser} from '@rl-auth/auth/supabase/decorators/current-user.decorator';
import {GetNotificationByIdDto} from '@rl-config/config/micro/rabbitmq/dto/notifications/GetNotificationById.dto';
import {NotificationDto} from '@rl-config/config/micro/rabbitmq/dto/notifications/Notification.dto';
import {notificationsMessagePatterns} from '@rl-config/config/micro/rabbitmq/message-patterns/notifications/notifications.message.patterns';
import {IdParamDto} from '@rl-validation/validation';
import {AuthUser} from '@supabase/supabase-js';

@ApiTags('Comms')
@Controller('notifications')
export class NotificationsController {
  constructor(@Inject('COMMS') private readonly commsClient: ClientProxy) {}

  @Get('for-user')
  findAllForUser(@CurrentUser() currentUser: AuthUser) {}

  @Patch('for-user')
  async acknowledgeAllForUser(@CurrentUser() currentUser: AuthUser) {}

  @Delete('for-user')
  async deleteAllForUser(@CurrentUser() currentUser: AuthUser) {}

  @Get(':id')
  async findOne(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    const payload: GetNotificationByIdDto = {
      requestingUser: currentUser,
      notificationId: id,
    };
    return this.commsClient.send<NotificationDto, GetNotificationByIdDto>(
      notificationsMessagePatterns.getNotificationById,
      payload,
    );
  }

  @Patch(':id')
  async acknowledgeOne(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {}

  @Delete(':id')
  remove(@CurrentUser() currentUser: AuthUser, @Param() {id}: IdParamDto) {}
}
