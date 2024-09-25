import {Controller} from '@nestjs/common';
import {commsProto} from '@rl-gw';
import {Observable} from 'rxjs';

import {ApplicationMessagesService} from '../../application-messages/services/application-messages.service';
import {NotificationsService} from '../../notifications/services/notifications.service';

@Controller()
@commsProto.CommsServiceControllerMethods()
export class CommsController implements commsProto.CommsServiceController {
  constructor(
    private readonly notificationsService: NotificationsService,
    private readonly applicationMessagesService: ApplicationMessagesService,
  ) {}

  getNotificationsForUserByEmail(
    request: commsProto.ByEmailDto,
  ):
    | Promise<commsProto.NotificationDtos>
    | Observable<commsProto.NotificationDtos>
    | commsProto.NotificationDtos {
    return this.notificationsService.findAllForUser(request.email);
  }
  acknowledgeAllNotificationsForUserByEmail(
    request: commsProto.ByEmailDto,
  ):
    | Promise<commsProto.NotificationDtos>
    | Observable<commsProto.NotificationDtos>
    | commsProto.NotificationDtos {
    return this.notificationsService.acknowledgeAllForUser(request.email);
  }
  deleteAllNotificationsForUserByEmail(
    request: commsProto.ByEmailDto,
  ):
    | Promise<commsProto.NotificationDtos>
    | Observable<commsProto.NotificationDtos>
    | commsProto.NotificationDtos {
    return this.notificationsService.deleteAllForUser(request.email);
  }
  getNotificationById(
    request: commsProto.ByIdWithRequestingUserEmailDto,
  ):
    | Promise<commsProto.NotificationDto>
    | Observable<commsProto.NotificationDto>
    | commsProto.NotificationDto {
    return this.notificationsService.findOne(
      request.requestingUserEmail,
      request.id,
    );
  }
  acknowledgeNotificationById(
    request: commsProto.ByIdWithRequestingUserEmailDto,
  ):
    | Promise<commsProto.NotificationDto>
    | Observable<commsProto.NotificationDto>
    | commsProto.NotificationDto {
    return this.notificationsService.acknowledgeOne(
      request.requestingUserEmail,
      request.id,
    );
  }
  deleteNotificationById(
    request: commsProto.ByIdWithRequestingUserEmailDto,
  ):
    | Promise<commsProto.NotificationDto>
    | Observable<commsProto.NotificationDto>
    | commsProto.NotificationDto {
    return this.notificationsService.removeOne(
      request.requestingUserEmail,
      request.id,
    );
  }

  getPublicApplicationMessages():
    | Promise<commsProto.ApplicationMessageDtos>
    | Observable<commsProto.ApplicationMessageDtos>
    | commsProto.ApplicationMessageDtos {
    return this.applicationMessagesService.findAllPublicShownMessages();
  }
}
