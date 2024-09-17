import {Injectable, Logger} from '@nestjs/common';
import {OnEvent} from '@nestjs/event-emitter';
import {DateTime} from 'luxon';

import {PrismaService} from '../../../../../../../../prisma/services/prisma.service';
import {NotificationsService} from '../../../../../../../notifications/services/notifications.service';
import {UsersService} from '../../../../../../../users/services/users.service';
import {PropertiesService} from '../../../../services/properties.service';
import {PropertyTenantInvitationAcceptedEvent} from '../../events/PropertyTenantInvitationAccepted.event';
import {PropertyTenantInvitedEvent} from '../../events/PropertyTenantInvited.event';

@Injectable()
export class InvitationsEventsHandlerService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly propertiesService: PropertiesService,
    private readonly notificationsService: NotificationsService,
  ) {}

  @OnEvent(PropertyTenantInvitedEvent.eventIdentifier, {async: true})
  async handlePropertyTenantInvitedEvent(event: PropertyTenantInvitedEvent) {
    this.logger.log(
      `On -> ${PropertyTenantInvitationAcceptedEvent.eventIdentifier}: ${event.email}`,
    );
    const property = await this.propertiesService.getPropertyForViewing(
      event.email,
      event.propertyId,
    );
    const user = await this.usersService.findByEmail(event.email);
    await this.prismaService.propertyInvitationToken.create({
      data: {
        userId: user.id,
        propertyId: event.propertyId,
        value: event.propertyInvitationTokenValue,
        expirationDateTime: DateTime.now().plus({month: 1}).toJSDate(),
      },
    });
    await this.notificationsService.createNotificationForUser(event.email, {
      targetUserEmail: event.email,
      title: 'Property Invitation',
      extendedMessage: `${event.inviterDisplayName} has invited you to join property: ${property.name}`,
      type: 'PROPERTY_INVITATION',
      propertyId: event.propertyId,
      propertyInvitationTokenValue: event.propertyInvitationTokenValue,
    });
  }

  @OnEvent(PropertyTenantInvitationAcceptedEvent.eventIdentifier, {async: true})
  async handlePropertyTenantInvitationAcceptedEvent(
    event: PropertyTenantInvitationAcceptedEvent,
  ) {
    this.logger.log(
      `On -> ${PropertyTenantInvitationAcceptedEvent.eventIdentifier}: ${event.email}`,
    );
    await this.notificationsService.acknowledgeAcceptedInvitationNotification(
      event.email,
      event.propertyInvitationTokenValue,
    );
  }
}
