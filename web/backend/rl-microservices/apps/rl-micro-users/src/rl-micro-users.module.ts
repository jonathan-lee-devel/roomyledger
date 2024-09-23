import { Module } from '@nestjs/common';
import { RlMicroUsersController } from './rl-micro-users.controller';
import { RlMicroUsersService } from './rl-micro-users.service';

@Module({
  imports: [],
  controllers: [RlMicroUsersController],
  providers: [RlMicroUsersService],
})
export class RlMicroUsersModule {}
