import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {PrismaService} from '@rl-prisma/prisma';
import {RandomService} from '@rl-util/util';
import {AuthUser} from '@supabase/supabase-js';

import {CreatePropertyDto} from '../dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly randomService: RandomService,
    // private readonly paymentsService: PaymentsService,
  ) {}

  async create(requestingUser: AuthUser, createPropertyDto: CreatePropertyDto) {
    const propertyRulesId = await this.randomService.generateUUID();
    return this.prismaService.property.create({
      data: {
        createdByUserId: requestingUser.id,
        name: createPropertyDto.name,
        expenses: {
          create: [],
        },
        administrators: {
          create: [
            {
              userId: requestingUser.id,
            },
          ],
        },
        tenants: {
          create: createPropertyDto.addSelfAsTenant
            ? [
                {
                  userId: requestingUser.id,
                  isAccepted: true,
                },
              ]
            : [],
        },
        rulesId: propertyRulesId,
        rules: {
          create: {
            id: propertyRulesId,
            numberOfExpenseApprovalsRequired: 1,
          },
        },
      },
    });
  }

  async findAllWhereInvolved(requestingUser: AuthUser) {
    const propertiesWhereInvolved = await this.prismaService.property.findMany({
      where: {
        OR: [
          {
            administrators: {
              some: {
                userId: requestingUser.id,
              },
            },
          },
          {
            tenants: {
              some: {
                userId: requestingUser.id,
                isAccepted: true,
              },
            },
          },
        ],
      },
      include: this.getIncludeAllFieldsForPropertyObject(),
    });
    return Promise.all(
      propertiesWhereInvolved.map(async (property) => ({
        ...property,
        paymentStatus: await this.paymentsService.getCustomerPaymentStatus(
          property.createdBy.email,
        ),
      })),
    );
  }

  async findOne(requestingUserEmail: string, id: string) {
    const property = await this.prismaService.property.findUnique({
      where: {id},
      include: this.getIncludeAllFieldsForPropertyObject(),
    });
    if (!property) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }
    if (
      !property.administrators
        .map((administrator) => administrator.user.email)
        .includes(requestingUserEmail) &&
      !property.tenants
        .map((tenant) => tenant.user.email)
        .includes(requestingUserEmail)
    ) {
      throw new ForbiddenException();
    }

    const creatorPaymentStatus =
      await this.paymentsService.getCustomerPaymentStatus(
        property.createdBy.email,
      );

    return {
      ...property,
      creatorPaymentStatus,
    };
  }

  async remove(requestingUserEmail: string, id: string) {
    const propertyToRemove = await this.prismaService.property.findUnique({
      where: {id},
      include: this.getIncludeAllFieldsForPropertyObject(),
    });
    if (!propertyToRemove) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }
    if (propertyToRemove.createdBy.email !== requestingUserEmail) {
      throw new ForbiddenException();
    }
    await this.prismaService.property.delete({where: {id}});
    return propertyToRemove;
  }

  async togglePropertyAdmin(
    requestingUser: AuthUser,
    id: string,
    emailToToggle: string,
  ) {
    const property = await this.getPropertyForModification(
      requestingUser.email,
      id,
    );
    if (
      property.administrators
        .map((administrator) => administrator.user.email)
        .includes(emailToToggle)
    ) {
      await this.prismaService.propertyAdministrator.deleteMany({
        where: {propertyId: id, userId: requestingUser.id},
      });
    } else {
      await this.prismaService.propertyAdministrator.create({
        data: {
          propertyId: id,
          userId: requestingUser.id,
        },
      });
    }

    return this.getPropertyForViewing(requestingUser.email, id);
  }

  async togglePropertyTenant(
    requestingUser: AuthUser,
    id: string,
    emailToToggle: string,
  ) {
    const property = await this.getPropertyForModification(
      requestingUser.email,
      id,
    );
    if (
      property.tenants
        .map((tenant) => tenant.user.email)
        .includes(emailToToggle)
    ) {
      await this.prismaService.propertyTenant.deleteMany({
        where: {propertyId: id, userId: requestingUser.id},
      });
    } else {
      await this.prismaService.propertyTenant.create({
        data: {
          propertyId: id,
          userId: requestingUser.id,
          isAccepted: true,
        },
      });
    }

    return this.getPropertyForViewing(requestingUser.email, id);
  }

  async getPropertyForViewing(requestingUserEmail: string, id: string) {
    const property = await this.getPropertyById(id);
    if (
      !property.administrators
        .map((administrator) => administrator.user.email)
        .includes(requestingUserEmail) &&
      !property.tenants
        .map((tenant) => tenant.user.email)
        .includes(requestingUserEmail)
    ) {
      throw new ForbiddenException();
    }

    const creatorPaymentStatus =
      await this.paymentsService.getCustomerPaymentStatus(
        property.createdBy.email,
      );

    return {
      ...property,
      creatorPaymentStatus,
    };
  }

  async getPropertyForModification(requestingUserEmail: string, id: string) {
    const property = await this.getPropertyById(id);
    if (
      !property.administrators
        .map((administrator) => administrator.user.email)
        .includes(requestingUserEmail)
    ) {
      throw new ForbiddenException();
    }
    return property;
  }

  private async getPropertyById(id: string) {
    const property = await this.prismaService.property.findUnique({
      where: {id},
      include: this.getIncludeAllFieldsForPropertyObject(),
    });
    if (!property) {
      throw new NotFoundException(`Property with id ${id} not found`);
    }
    return property;
  }

  private getIncludeAllFieldsForPropertyObject() {
    return {
      administrators: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
      tenants: {
        include: {
          user: {
            include: {
              profile: true,
            },
          },
        },
      },
      rules: true,
      expenses: true,
      createdBy: true,
    };
  }
}
