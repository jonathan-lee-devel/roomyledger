import {Controller, Get} from '@nestjs/common';

import {RlMicroUsersService} from './rl-micro-users.service';

@Controller()
export class RlMicroUsersController {
  constructor(private readonly rlMicroUsersService: RlMicroUsersService) {}

  @Get()
  getHello(): string {
    return this.rlMicroUsersService.getHello();
  }
}
