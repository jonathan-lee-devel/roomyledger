import {Controller, Get, Inject, Logger, OnModuleInit} from '@nestjs/common';
import {ClientGrpc} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {commsProto} from '@rl-gw';

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
  getPublicMessages() {
    this.logger.log(
      `Request to get public-messages for user with e-mail test@test.com`,
    );
    return this.commsServiceClient.getPublicApplicationMessages({
      email: 'test@test.com',
    });
  }
}
