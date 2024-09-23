import { Module } from '@nestjs/common';
import { CommsService } from './comms.service';
import { CommsController } from './comms.controller';

@Module({
  controllers: [CommsController],
  providers: [CommsService],
})
export class CommsModule {}
