import {
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';

import {PrismaService} from '../../../../../lib/prisma/services/prisma.service';
import {SupabaseStorageService} from '../../../../../lib/supabase-storage/services/supabase-db/supabase-storage.service';
import {UsersService} from '../../../../users/services/users.service';
import {PropertiesService} from '../../properties/services/properties.service';
import {CreateExpenseDto} from '../dto/create-expense.dto';
import {DateRangeDto} from '../dto/date-range.dto';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService,
    private readonly supabaseStorageService: SupabaseStorageService,
  ) {}

  async create(
    requestingUserEmail: string,
    createExpenseDto: CreateExpenseDto,
  ) {
    this.logger.log(
      `Request from ${requestingUserEmail} to create expense for property with ID: ${createExpenseDto.propertyId}`,
    );
    await this.propertiesService.getPropertyForViewing(
      requestingUserEmail,
      createExpenseDto.propertyId,
    );
    const user = await this.usersService.findByEmail(requestingUserEmail);
    return this.prismaService.expense.create({
      data: {
        amount: createExpenseDto.amount,
        currency: createExpenseDto.currencyCode,
        name: createExpenseDto.name,
        propertyId: createExpenseDto.propertyId,
        description: createExpenseDto.description,
        filePath: createExpenseDto.filePath,
        state: 'PENDING',
        createdByUserId: user.id,
      },
      include: {
        approvals: true,
        distributions: true,
        comments: true,
        disputes: true,
        createdBy: {
          include: {
            profile: true,
          },
        },
      },
    });
  }

  async findAllForPropertyById(
    requestingUserEmail: string,
    propertyId: string,
    dateRange: DateRangeDto,
  ) {
    this.logger.log(
      `Request from ${requestingUserEmail} to get expenses for property with ID ${propertyId} from ${dateRange.startDate} to ${dateRange.endDate}`,
    );
    const property = await this.propertiesService.getPropertyForViewing(
      requestingUserEmail,
      propertyId,
    );
    return this.prismaService.expense.findMany({
      where: {
        property: {
          id: property.id,
        },
        createdAt: {
          gte: dateRange.startDate.toJSDate(),
          lte: dateRange.endDate.toJSDate(),
        },
      },
      include: {
        createdBy: {
          include: {
            profile: true,
          },
        },
        approvals: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
        disputes: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
        comments: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
        distributions: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });
  }

  async deleteExpenseById(requestingUserEmail: string, id: string) {
    const expense = await this.prismaService.expense.findUnique({
      where: {id: id},
      include: {
        createdBy: true,
      },
    });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    const property = await this.propertiesService.getPropertyForViewing(
      requestingUserEmail,
      expense.propertyId,
    );
    if (
      expense.createdBy.email !== requestingUserEmail &&
      !property.administrators
        .map((administrator) => administrator.user.email)
        .includes(requestingUserEmail)
    ) {
      throw new ForbiddenException();
    }
    return this.prismaService.expense.delete({where: {id: id}});
  }

  async getExpenseById(requestingUserEmail: string, id: string) {
    const expense = await this.prismaService.expense.findUnique({
      where: {id: id},
      include: {
        createdBy: {
          include: {
            profile: true,
          },
        },
        disputes: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
        comments: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
        approvals: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
        distributions: {
          include: {
            createdBy: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });
    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
    await this.propertiesService.getPropertyForViewing(
      requestingUserEmail,
      expense.propertyId,
    );
    let imageUrl: string | undefined = undefined;
    if (expense.filePath) {
      const splitImageFilePath = expense.filePath.split('/');
      const {data, error} =
        await this.supabaseStorageService.generateUrlForImage(
          splitImageFilePath[0],
          [...splitImageFilePath.slice(1)].join('/'),
        );
      if (error) {
        this.logger.error(
          `Error while generating URL for expense with ID: ${expense.id}`,
          error,
        );
        return expense;
      }
      imageUrl = data?.signedUrl;
    }
    return {
      ...expense,
      imageUrl,
    };
  }
}
