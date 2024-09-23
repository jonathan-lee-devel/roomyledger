import { Controller } from '@nestjs/common';
import { CommsService } from './comms.service';
import { Observable } from 'rxjs';
import {
  ApplicationMessageDtos,
  CommsServiceController,
  CommsServiceControllerMethods,
  GetPublicApplicationMessagesDto,
} from '../../../rl-micro-api-gateway/src/proto/comms';

@Controller()
@CommsServiceControllerMethods()
export class CommsController implements CommsServiceController {
  constructor(private readonly commsService: CommsService) {}

  getPublicApplicationMessages(
    request: GetPublicApplicationMessagesDto,
  ):
    | Promise<ApplicationMessageDtos>
    | Observable<ApplicationMessageDtos>
    | ApplicationMessageDtos {
    return {
      messages: [
        {
          id: '12345',
          message: 'Hello, World!',
          title: 'Introduction',
          isPublic: true,
          isShow: true,
          createdByEmail: request.email,
          createdByUserId: '12345',
          routerLink: '/login',
          routerLinkText: 'Login',
          severity: 'info',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ],
    };
  }
}
