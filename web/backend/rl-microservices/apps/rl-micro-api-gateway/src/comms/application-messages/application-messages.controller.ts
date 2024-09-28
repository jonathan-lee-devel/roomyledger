import {Controller, Get, Inject} from '@nestjs/common';
import {ClientProxy} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {Public} from '@rl-auth/auth/supabase/decorators/is-public.decorator';
import {environment} from '@rl-config/config/environment.index';
import {EmptyPayloadDto} from '@rl-config/config/micro/rabbitmq/dto/common/EmptyPayload.dto';
import {applicationMessagesMessagePatterns} from '@rl-config/config/micro/rabbitmq/message-patterns/comms/application-messages/application-messages.message.patterns';

@ApiTags('Comms')
@Controller('application-messages')
export class ApplicationMessagesController {
  constructor(
    @Inject(environment.commsService.name)
    private readonly commsClient: ClientProxy,
  ) {}

  @Public()
  @Get('public')
  getPublicMessages() {
    const payload: EmptyPayloadDto = {};
    return this.commsClient.send(
      applicationMessagesMessagePatterns.getAllPublicMessages,
      payload,
    );
  }
}
