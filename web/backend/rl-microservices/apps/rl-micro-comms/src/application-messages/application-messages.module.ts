import {Module} from '@nestjs/common';
import {PrismaModule} from '@rl-prisma/prisma';

import {ApplicationMessagesController} from './controllers/application-messages.controller';
import {ApplicationMessagesService} from './services/application-messages.service';

@Module({
  imports: [PrismaModule],
  controllers: [ApplicationMessagesController],
  providers: [ApplicationMessagesService],
})
export class ApplicationMessagesModule {}
