import {Injectable} from '@nestjs/common';

@Injectable()
export class RlMicroApiGatewayService {
  getHello(): string {
    return 'Hello World!';
  }
}
