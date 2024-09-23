import { Controller, Get } from '@nestjs/common';
import { RlMicroCommsService } from './rl-micro-comms.service';

@Controller()
export class RlMicroCommsController {
  constructor(private readonly rlMicroCommsService: RlMicroCommsService) {}

  @Get()
  getHello(): string {
    return this.rlMicroCommsService.getHello();
  }
}
