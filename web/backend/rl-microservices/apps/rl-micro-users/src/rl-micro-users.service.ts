import {Injectable} from '@nestjs/common';

@Injectable()
export class RlMicroUsersService {
  getHello(): string {
    return 'Hello World!';
  }
}
