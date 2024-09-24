import {
  ForbiddenException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import {PrismaService} from '../../../../../prisma/services/prisma.service';
import {PaymentsService} from '../../../../payments-grpc/services/payments-grpc.service';
import {UsersService} from '../../../../users/services/users.service';
import {RandomService} from '../../../../util/services/random/random.service';
import {CreatePropertyDto} from '../dto/create-property.dto';

@Injectable()
export class PropertiesService {
  constructor(
    private readonly usersService: UsersService,
    private readonly prismaService: PrismaService,
    private readonly randomService: RandomService,
    private readonly paymentsService: PaymentsService,
  ) {}

  async create(
    requestingUserEmail: string,
    createPropertyDto: CreatePropertyDto,
  ) {
    const user = await this.usersService.findByEmail(requestingUserEmail);
    const propertyRulesId = await this.randomService.generateUUID();
    return this.prismaService.property.create({
      data: {
        createdByUserId: user.id,
        name: createPropertyDto.name,
        expenses: {
          create: [],
        },
        administrators: {
          create: [
            {
              userId: user.id,
            },
          ],
        },
        tenants: {
          create: createPropertyDto.addSelfAsTenant
            ? [
                {
                  userId: user.id,
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

  async findAllWhereInvolved(requestingUserEmail: string) {
    const user = await this.usersService.findByEmail(requestingUserEmail);
    if (!user) {
      throw new InternalServerErrorException();
    }
    const propertiesWhereInvolved = await this.prismaService.property.findMany({
      where: {
        OR: [
          {
            administrators: {
              some: {
                user,
              },
            },
          },
          {
            tenants: {
              some: {
                user,
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
    requestingUserEmail: string,
    id: string,
    emailToToggle: string,
  ) {
    const property = await this.getPropertyForModification(
      requestingUserEmail,
      id,
    );
    const user = await this.usersService.findByEmail(emailToToggle);
    if (
      property.administrators
        .map((administrator) => administrator.user.email)
        .includes(emailToToggle)
    ) {
      await this.prismaService.propertyAdministrator.deleteMany({
        where: {propertyId: id, userId: user.id},
      });
    } else {
      await this.prismaService.propertyAdministrator.create({
        data: {
          propertyId: id,
          userId: user.id,
        },
      });
    }

    return this.getPropertyForViewing(requestingUserEmail, id);
  }

  async togglePropertyTenant(
    requestingUserEmail: string,
    id: string,
    emailToToggle: string,
  ) {
    const property = await this.getPropertyForModification(
      requestingUserEmail,
      id,
    );
    const user = await this.usersService.findByEmail(emailToToggle);
    if (
      property.tenants
        .map((tenant) => tenant.user.email)
        .includes(emailToToggle)
    ) {
      await this.prismaService.propertyTenant.deleteMany({
        where: {propertyId: id, userId: user.id},
      });
    } else {
      await this.prismaService.propertyTenant.create({
        data: {
          propertyId: id,
          userId: user.id,
          isAccepted: true,
        },
      });
    }

    return this.getPropertyForViewing(requestingUserEmail, id);
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
