import {Controller, Delete, Get, Inject, Param, Patch} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {CurrentUser} from '@rl-auth/auth/supabase/decorators/current-user.decorator';
import {IdParamDto} from '@rl-validation/validation';
import {AuthUser} from '@supabase/supabase-js';
import {timeout} from 'rxjs';

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
    return this.commsClient
      .send({cmd: 'get-notification-by-id'}, {hello: 'World'})
      .pipe(timeout(10_000));
  }

  @Patch(':id')
  async acknowledgeOne(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {}

  @Delete(':id')
  remove(@CurrentUser() currentUser: AuthUser, @Param() {id}: IdParamDto) {}
}
