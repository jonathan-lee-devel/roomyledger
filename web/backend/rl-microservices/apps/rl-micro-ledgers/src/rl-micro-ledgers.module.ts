import { Module } from '@nestjs/common';
import { RlMicroLedgersController } from './rl-micro-ledgers.controller';
import { RlMicroLedgersService } from './rl-micro-ledgers.service';

@Module({
  imports: [],
  controllers: [RlMicroLedgersController],
  providers: [RlMicroLedgersService],
})
export class RlMicroLedgersModule {}
