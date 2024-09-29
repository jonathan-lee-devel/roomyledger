import {Injectable} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';

import {PrismaService} from '../../../lib/prisma/services/prisma.service';
import {UserCheckInEvent} from '../events/UserCheckIn.event';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async checkIn(requestingUserEmail: string, displayName?: string) {
    this.eventEmitter.emit(
      UserCheckInEvent.eventIdentifier,
      new UserCheckInEvent(requestingUserEmail, displayName),
    );
    return {isAcknowledged: true};
  }

  async findByEmail(email: string, isIncludeProfile?: boolean) {
    return this.prismaService.user.findUnique({
      where: {email},
      include: {
        profile: isIncludeProfile,
      },
    });
  }

  async createPlaceholderUser(email: string) {
    return this.prismaService.user.create({
      data: {
        email,
        profile: {
          create: {
            displayName: `Placeholder ${email}`,
          },
        },
        isEmailVerified: false,
      },
      include: {
        profile: true,
      },
    });
  }
}
