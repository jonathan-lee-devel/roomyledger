import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import {$Enums} from '@prisma/client';
import {commsProto} from '@rl-gw';
import {PrismaService} from '@rl-prisma/prisma';

import {CreateNotificationDto} from '../dto/CreateNotification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
  ) {}

  async findAllForUser(requestingUserEmail: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to load all notifications`,
    );
    return {
      notifications: (
        await this.prismaService.notification.findMany({
          where: {
            user: {
              email: requestingUserEmail,
            },
          },
        })
      ).map((queryNotification) =>
        this.mapQueryNotificationToNotificationDto(queryNotification),
      ),
    };
  }

  async acknowledgeAllForUser(requestingUserEmail: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to acknowledge all notifications`,
    );
    await this.prismaService.notification.updateMany({
      where: {
        user: {
          email: requestingUserEmail,
        },
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
    await this.prismaService.notification.deleteMany({
      where: {
        user: {
          email: requestingUserEmail,
        },
      },
    });
    return this.findAllForUser(requestingUserEmail);
  }

  async findOne(requestingUserEmail: string, id: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to acknowledge notification by ID: ${id}`,
    );
    const notification = await this.prismaService.notification.findUnique({
      where: {id},
      include: {
        user: true,
      },
    });
    if (!notification) {
      throw new NotFoundException();
    }
    if (notification.user.email !== requestingUserEmail) {
      throw new ForbiddenException();
    }
    return this.mapQueryNotificationToNotificationDto(notification);
  }

  async removeOne(requestingUserEmail: string, id: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to delete notification by ID: ${id}`,
    );
    const notification = await this.prismaService.notification.findUnique({
      where: {id},
      include: {
        user: true,
      },
    });
    if (!notification) {
      throw new NotFoundException();
    }
    if (notification.user.email !== requestingUserEmail) {
      throw new ForbiddenException();
    }
    await this.prismaService.notification.delete({
      where: {id},
    });
    return this.mapQueryNotificationToNotificationDto(notification);
  }

  async acknowledgeOne(requestingUserEmail: string, id: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to acknowledge notification by ID: ${id}`,
    );
    const notification = await this.prismaService.notification.findUnique({
      where: {id},
      include: {
        user: true,
      },
    });
    if (!notification) {
      throw new NotFoundException();
    }
    if (notification.user.email !== requestingUserEmail) {
      throw new ForbiddenException();
    }
    await this.prismaService.notification.updateMany({
      where: {id},
      data: {
        isAcknowledged: true,
      },
    });
    return this.mapQueryNotificationToNotificationDto(
      await this.prismaService.notification.findUnique({
        where: {id},
      }),
    );
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
    // const user = await this.usersService.findByEmail(requestingUserEmail);
    const user = {id: '12345'};
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

  private mapQueryNotificationToNotificationDto(queryNotification: {
    updatedAt: Date;
    createdAt: Date;
    id: string;
    userId: string;
    title: string;
    extendedMessage: string;
    isAcknowledged: boolean;
    type: $Enums.NotificationType;
    invitationTokenValue: string | null;
    propertyId: string | null;
  }): commsProto.NotificationDto {
    return <commsProto.NotificationDto>{
      id: queryNotification.id,
      userId: queryNotification.userId,
      title: queryNotification.title,
      extendedMessage: queryNotification.extendedMessage,
      isAcknowledged: queryNotification.isAcknowledged,
      type: queryNotification.type,
      propertyId: queryNotification.propertyId,
      invitationTokenValue: queryNotification.invitationTokenValue,
      createdAt: queryNotification.createdAt.toISOString(),
      updatedAt: queryNotification.updatedAt.toISOString(),
    };
  }
}
