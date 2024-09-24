import {Controller, Get} from '@nestjs/common';

import {RlMicroLedgersService} from './rl-micro-ledgers.service';

@Controller()
export class RlMicroLedgersController {
  constructor(private readonly rlMicroLedgersService: RlMicroLedgersService) {}

  @Get()
  getHello(): string {
    return this.rlMicroLedgersService.getHello();
  }
}
