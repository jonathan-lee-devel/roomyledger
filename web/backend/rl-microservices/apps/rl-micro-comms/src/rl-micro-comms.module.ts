import { Module } from '@nestjs/common';
import { RlMicroCommsController } from './rl-micro-comms.controller';
import { RlMicroCommsService } from './rl-micro-comms.service';

@Module({
  imports: [],
  controllers: [RlMicroCommsController],
  providers: [RlMicroCommsService],
})
export class RlMicroCommsModule {}
