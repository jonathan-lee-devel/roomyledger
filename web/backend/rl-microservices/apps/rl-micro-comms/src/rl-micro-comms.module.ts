import { Module } from '@nestjs/common';
import { CommsController } from './comms/comms.controller';
import { CommsService } from './comms/comms.service';

@Module({
  imports: [],
  controllers: [CommsController],
  providers: [CommsService],
})
export class RlMicroCommsModule {}
