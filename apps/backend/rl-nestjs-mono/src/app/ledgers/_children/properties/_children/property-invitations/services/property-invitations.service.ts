import {BadRequestException, Injectable, Logger} from '@nestjs/common';
import {EventEmitter2} from '@nestjs/event-emitter';
import {DateTime} from 'luxon';

import {PrismaService} from '../../../../../../../prisma/services/prisma.service';
import {UsersService} from '../../../../../../users/services/users.service';
import {RandomService} from '../../../../../../util/services/random/random.service';
import {PropertiesService} from '../../../services/properties.service';
import {PropertyTenantInvitationAcceptedEvent} from '../events/PropertyTenantInvitationAccepted.event';
import {PropertyTenantInvitedEvent} from '../events/PropertyTenantInvited.event';

@Injectable()
export class PropertyInvitationsService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService,
    private readonly randomService: RandomService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async inviteTenantToProperty(
    requestingUserEmail: string,
    requestingUserDisplayName: string,
    propertyId: string,
    emailToInvite: string,
  ) {
    this.logger.log(
      `Request from ${requestingUserEmail} to invite: ${emailToInvite} to property with ID: ${propertyId}`,
    );
    const property = await this.propertiesService.getPropertyForModification(
      requestingUserEmail,
      propertyId,
    );
    if (
      property.tenants
        .map((tenant) => tenant.user.email)
        .includes(emailToInvite)
    ) {
      throw new BadRequestException(
        `${emailToInvite} is already a tenant of property with ID: ${propertyId}`,
      );
    }
    let user = await this.usersService.findByEmail(emailToInvite);
    if (!user) {
      user = await this.usersService.createPlaceholderUser(emailToInvite);
    }
    await this.prismaService.propertyTenant.create({
      data: {
        property: {connect: {id: propertyId}},
        user: {connect: {id: user.id}},
        isAccepted: false,
      },
    });

    this.eventEmitter.emit(
      PropertyTenantInvitedEvent.eventIdentifier,
      new PropertyTenantInvitedEvent(
        emailToInvite,
        propertyId,
        requestingUserDisplayName,
        await this.randomService.generateRandomToken(
          RandomService.defaultTokenLength,
        ),
      ),
    );

    return this.propertiesService.getPropertyForViewing(
      requestingUserEmail,
      propertyId,
    );
  }

  async acceptInvitationToProperty(
    requestingUserEmail: string,
    propertyId: string,
    tokenValue: string,
  ) {
    this.logger.log(
      `Request from <${requestingUserEmail}> to accept invitation to property with ID: ${propertyId}`,
    );
    const user = await this.usersService.findByEmail(requestingUserEmail);
    const token = await this.prismaService.propertyInvitationToken.findFirst({
      where: {value: tokenValue},
    });
    if (
      !token ||
      DateTime.now() >= DateTime.fromJSDate(token.expirationDateTime)
    ) {
      throw new BadRequestException('Invalid or expired token provided');
    }
    const property = await this.propertiesService.getPropertyForViewing(
      requestingUserEmail,
      propertyId,
    );
    if (!property) {
      throw new BadRequestException(
        `Property with ID: ${propertyId} not found`,
      );
    }
    await this.prismaService.propertyInvitationToken.update({
      where: {
        id: token.id,
      },
      data: {
        expirationDateTime: DateTime.now().toJSDate(),
      },
    });
    await this.prismaService.propertyTenant.updateMany({
      where: {
        userId: user.id,
        isAccepted: false,
      },
      data: {
        isAccepted: true,
      },
    });
    this.eventEmitter.emit(
      PropertyTenantInvitationAcceptedEvent.eventIdentifier,
      new PropertyTenantInvitationAcceptedEvent(
        requestingUserEmail,
        tokenValue,
      ),
    );
    return property;
  }
}
