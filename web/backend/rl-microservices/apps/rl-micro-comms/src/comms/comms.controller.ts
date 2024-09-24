import { Controller } from '@nestjs/common';
import { CommsService } from './comms.service';
import { Observable } from 'rxjs';
import { commsProto } from '@rl-gw';

@Controller()
@commsProto.CommsServiceControllerMethods()
export class CommsController implements commsProto.CommsServiceController {
  constructor(private readonly commsService: CommsService) {}

  getPublicApplicationMessages(
    request: commsProto.GetPublicApplicationMessagesDto,
  ):
    | Promise<commsProto.ApplicationMessageDtos>
    | Observable<commsProto.ApplicationMessageDtos>
    | commsProto.ApplicationMessageDtos {
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
