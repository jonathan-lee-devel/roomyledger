import {Controller, Get, Inject, Logger, OnModuleInit} from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {CurrentUser} from '@rl-auth/auth/supabase/decorators/current-user.decorator';
import {commsProto} from '@rl-gw';
import {AuthUser} from '@supabase/supabase-js';

@ApiTags('Comms')
@Controller('application-messages')
export class ApplicationMessagesController implements OnModuleInit {
  private commsServiceClient: commsProto.CommsServiceClient;

  constructor(
    private readonly logger: Logger,
    @Inject(commsProto.COMMS_PACKAGE_NAME)
    private readonly commsClientGrpc: ClientGrpc,
  ) {}

  async onModuleInit() {
    this.commsServiceClient =
      this.commsClientGrpc.getService<commsProto.CommsServiceClient>(
        commsProto.COMMS_SERVICE_NAME,
      );
  }

  @Get('public')
  getPublicMessages(@CurrentUser() currentUser: AuthUser) {
    this.logger.log(
      `Request to get public-messages for user with e-mail test@test.com`,
    );
    return this.commsServiceClient.getPublicApplicationMessages({
      email: currentUser.email,
    });
  }
}
