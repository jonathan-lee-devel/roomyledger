import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Comms')
@Controller('notifications')
export class NotificationsController {
  @Get('for-user')
  getNotificationsForUser() {
    return [];
  }
}
