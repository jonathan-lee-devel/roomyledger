import { Injectable } from '@nestjs/common';

@Injectable()
export class RlMicroCommsService {
  getHello(): string {
    return 'Hello World!';
  }
}
