import { Injectable } from '@nestjs/common';

@Injectable()
export class RlMicroLedgersService {
  getHello(): string {
    return 'Hello World!';
  }
}
