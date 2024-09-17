import {Injectable, Logger} from '@nestjs/common';

import {PrismaService} from '../../../prisma/services/prisma.service';
import {UsersService} from '../../users/services/users.service';
import {CreateNotificationDto} from '../dto/CreateNotification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findAllForUser(requestingUserEmail: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to load all notifications`,
    );
    return this.prismaService.notification.findMany({
      where: {
        user: {
          email: requestingUserEmail,
        },
      },
    });
  }

  async acknowledgeAllForUser(requestingUserEmail: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to acknowledge all notifications`,
    );
    const user = await this.usersService.findByEmail(requestingUserEmail);
    await this.prismaService.notification.updateMany({
      where: {
        userId: user.id,
      },
      data: {
        isAcknowledged: true,
      },
    });
    return this.findAllForUser(requestingUserEmail);
  }

  async deleteAllForUser(requestingUserEmail: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to acknowledge all notifications`,
    );
    const user = await this.usersService.findByEmail(requestingUserEmail);
    return this.prismaService.notification.deleteMany({
      where: {
        userId: user.id,
      },
    });
  }

  findOne(requestingUserEmail: string, id: string) {
    return `This action returns a #${id} notification`;
  }

  remove(requestingUserEmail: string, id: string) {
    return `This action removes a #${id} notification`;
  }

  acknowledgeOne(requestingUserEmail: string, id: string) {
    return `This action acknowledges a #${id} notification`;
  }

  async acknowledgeAcceptedInvitationNotification(
    requestingUserEmail: string,
    propertyInvitationTokenValue: string,
  ) {
    this.logger.log(
      `Acknowledging accepted property invitation notification for user: ${requestingUserEmail}`,
    );
    await this.prismaService.notification.updateMany({
      where: {
        isAcknowledged: false,
        invitationTokenValue: propertyInvitationTokenValue,
      },
      data: {
        isAcknowledged: true,
      },
    });
  }

  async createNotificationForUser(
    targetUserEmail: string,
    notificationDto: CreateNotificationDto,
  ) {
    this.logger.log(`Creating notification for user: ${targetUserEmail}`);
    const user = await this.usersService.findByEmail(targetUserEmail);
    return this.prismaService.notification.create({
      data: {
        userId: user.id,
        title: notificationDto.title,
        extendedMessage: notificationDto.extendedMessage,
        isAcknowledged: false,
        type: notificationDto.type,
        propertyId: notificationDto.propertyId,
        invitationTokenValue: notificationDto.propertyInvitationTokenValue,
      },
    });
  }
}
