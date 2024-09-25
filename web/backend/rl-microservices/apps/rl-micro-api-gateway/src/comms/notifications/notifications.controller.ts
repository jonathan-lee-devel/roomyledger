import {
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
} from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {CurrentUser} from '@rl-auth/auth/supabase/decorators/current-user.decorator';
import {commsProto} from '@rl-gw';
import {IdParamDto} from '@rl-validation/validation';
import {AuthUser} from '@supabase/supabase-js';

@ApiTags('Comms')
@Controller('notifications')
export class NotificationsController implements OnModuleInit {
  private commsServiceClient: commsProto.CommsServiceClient;

  constructor(
    @Inject(commsProto.COMMS_PACKAGE_NAME)
    private readonly commsClientGrpc: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.commsServiceClient =
      this.commsClientGrpc.getService<commsProto.CommsServiceClient>(
        commsProto.COMMS_SERVICE_NAME,
      );
  }

  @Get('for-user')
  findAllForUser(@CurrentUser() currentUser: AuthUser) {
    return this.commsServiceClient.getNotificationsForUserByEmail({
      email: currentUser.email,
    });
  }

  @Patch('for-user')
  async acknowledgeAllForUser(@CurrentUser() currentUser: AuthUser) {
    return this.commsServiceClient.acknowledgeAllNotificationsForUserByEmail({
      email: currentUser.email,
    });
  }

  @Delete('for-user')
  async deleteAllForUser(@CurrentUser() currentUser: AuthUser) {
    return this.commsServiceClient.deleteAllNotificationsForUserByEmail({
      email: currentUser.email,
    });
  }

  @Get(':id')
  async findOne(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.commsServiceClient.getNotificationById({
      requestingUserEmail: currentUser.email,
      id,
    });
  }

  @Patch(':id')
  async acknowledgeOne(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.commsServiceClient.acknowledgeNotificationById({
      requestingUserEmail: currentUser.email,
      id,
    });
  }

  @Delete(':id')
  remove(@CurrentUser() currentUser: AuthUser, @Param() {id}: IdParamDto) {
    return this.commsServiceClient.deleteNotificationById({
      requestingUserEmail: currentUser.email,
      id,
    });
  }
}
