import {Module} from '@nestjs/common';

import {ApplicationMessagesController} from './controllers/application-messages.controller';
import {ApplicationMessagesService} from './services/application-messages.service';
import {PrismaService} from '../../prisma/services/prisma.service';

@Module({
  controllers: [ApplicationMessagesController],
  providers: [ApplicationMessagesService, PrismaService],
})
export class ApplicationMessagesModule {}
