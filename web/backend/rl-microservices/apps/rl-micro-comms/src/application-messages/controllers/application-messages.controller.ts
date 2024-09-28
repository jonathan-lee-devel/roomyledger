import {Controller} from '@nestjs/common';
import {MessagePattern} from '@nestjs/microservices';
import {ApiTags} from '@nestjs/swagger';
import {applicationMessagesMessagePatterns} from '@rl-config/config/micro/rabbitmq/message-patterns/comms/application-messages/application-messages.message.patterns';

import {ApplicationMessagesService} from '../services/application-messages.service';

@ApiTags('ApplicationMessages')
@Controller('application-messages')
export class ApplicationMessagesController {
  constructor(
    private readonly applicationMessagesService: ApplicationMessagesService,
  ) {}

  @MessagePattern(applicationMessagesMessagePatterns.getAllPublicMessages)
  async findAll() {
    return this.applicationMessagesService.findAllPublicShownMessages();
  }
}
