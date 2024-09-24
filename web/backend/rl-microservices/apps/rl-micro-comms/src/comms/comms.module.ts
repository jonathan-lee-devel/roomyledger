import {Module} from '@nestjs/common';

import {CommsController} from './comms.controller';
import {CommsService} from './comms.service';
import {NotificationsModule} from '../notifications/notifications.module';

@Module({
  imports: [NotificationsModule],
  controllers: [CommsController],
  providers: [CommsService],
})
export class CommsModule {}
