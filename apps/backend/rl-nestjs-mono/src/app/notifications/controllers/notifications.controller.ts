import {Controller, Delete, Get, Param, Patch} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {IdParamDto} from '../../../validation/id.param.dto';
import {CurrentUser} from '../../auth/supabase/decorators/current-user.decorator';
import {NotificationsService} from '../services/notifications.service';

@ApiTags('Notifications')
@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get('for-user')
  async findAllForUser(@CurrentUser() currentUser: AuthUser) {
    return this.notificationsService.findAllForUser(currentUser.email);
  }

  @Patch('for-user')
  async acknowledgeAllForUser(@CurrentUser() currentUser: AuthUser) {
    return this.notificationsService.acknowledgeAllForUser(currentUser.email);
  }

  @Delete('for-user')
  async deleteAllForUser(@CurrentUser() currentUser: AuthUser) {
    return this.notificationsService.deleteAllForUser(currentUser.email);
  }

  @Get(':id')
  async findOne(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.notificationsService.findOne(currentUser.email, id);
  }

  @Patch(':id')
  async acknowledgeOne(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.notificationsService.acknowledgeOne(currentUser.email, id);
  }

  @Delete(':id')
  remove(@CurrentUser() currentUser: AuthUser, @Param() {id}: IdParamDto) {
    return this.notificationsService.remove(currentUser.email, id);
  }
}
