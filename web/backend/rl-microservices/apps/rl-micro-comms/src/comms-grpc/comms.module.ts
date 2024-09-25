import {Module} from '@nestjs/common';

import {NotificationsModule} from '../notifications/notifications.module';
import {CommsController} from './controllers/comms.controller';

@Module({
  imports: [NotificationsModule],
  controllers: [CommsController],
  providers: [],
})
export class CommsModule {}
