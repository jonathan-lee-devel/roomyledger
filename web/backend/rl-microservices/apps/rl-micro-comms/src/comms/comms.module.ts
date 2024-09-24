import {Module} from '@nestjs/common';

import {CommsController} from './comms.controller';
import {CommsService} from './comms.service';

@Module({
  controllers: [CommsController],
  providers: [CommsService],
})
export class CommsModule {}
