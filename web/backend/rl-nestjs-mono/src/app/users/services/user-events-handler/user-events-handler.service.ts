import {Injectable, Logger} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';

import {UserCheckInEvent} from '../../events/UserCheckIn.event';
import {RegistrationService} from '../registration/registration.service';
import {UsersService} from '../users.service';

@Injectable()
export class UserEventsHandlerService {
  constructor(
    private readonly logger: Logger,
    private readonly usersService: UsersService,
    private readonly registrationService: RegistrationService,
  ) {}

  @OnEvent(UserCheckInEvent.eventIdentifier, {async: true})
  async handleCheckInEvent(event: UserCheckInEvent) {
    this.logger.log(`On -> user check-in event with e-mail: <${event.email}>`);
    const user = await this.usersService.findByEmail(
      event.email?.toLowerCase(),
    );
    if (!user) {
      await this.registrationService.createPreVerifiedUser(
        event.email?.toLowerCase(),
        event.displayName ?? '',
      );
    } else if (!user?.isEmailVerified) {
      await this.registrationService.verifyUser(user.id, event.displayName);
    }
  }
}
