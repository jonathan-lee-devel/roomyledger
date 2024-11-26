import {faker} from '@faker-js/faker';
import {BadRequestException, Logger, NotFoundException} from '@nestjs/common';
import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';

import {ExpenseDiscussionsService} from './expense-discussions.service';
import {PrismaService} from '../../../../../../../lib/prisma/services/prisma.service';
import {UsersService} from '../../../../../../users/services/users.service';
import {PropertiesService} from '../../../../properties/services/properties.service';
import {ExpensesService} from '../../../services/expenses.service';

describe('ExpenseDiscussionsService', () => {
  let service: ExpenseDiscussionsService;
  let mockLogger: Mocked<Logger>;
  let mockPrismaService: Mocked<PrismaService>;
  let mockExpensesService: Mocked<ExpensesService>;
  let mockPropertiesService: Mocked<PropertiesService>;
  let mockUsersService: Mocked<UsersService>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(
      ExpenseDiscussionsService,
    ).compile();
    service = unit;

    mockLogger = unitRef.get<Logger>(Logger);
    mockPrismaService = unitRef.get<PrismaService>(PrismaService);
    mockExpensesService = unitRef.get<ExpensesService>(ExpensesService);
    mockPropertiesService = unitRef.get<PropertiesService>(PropertiesService);
    mockUsersService = unitRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger).toBeDefined();
    expect(mockPrismaService).toBeDefined();
    expect(mockExpensesService).toBeDefined();
    expect(mockPropertiesService).toBeDefined();
  });

  it('should throw bad request exception when user approves their own expense', async () => {
    const mockRequestingUserEmail = faker.internet.email();
    const mockId = faker.string.uuid();

    mockExpensesService.getExpenseById.mockResolvedValue({
      createdBy: {
        email: mockRequestingUserEmail,
      },
    } as any);

    await expect(
      service.approveExpense(mockRequestingUserEmail, mockId),
    ).rejects.toThrow(BadRequestException);
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request from ${mockRequestingUserEmail} to approve expense with ID: ${mockId}`,
    );
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockId,
    );
  });

  it('should throw bad request exception when user approves an expense they already approved', async () => {
    const mockRequestingUserEmail = faker.internet.email();
    const mockCreatedByEmail = faker.internet.email();
    const mockId = faker.string.uuid();
    const mockExpense = {
      createdBy: {
        email: mockCreatedByEmail,
      },
      approvals: [
        {
          createdBy: {
            email: mockRequestingUserEmail,
          },
        },
      ],
    };

    mockExpensesService.getExpenseById.mockResolvedValue(mockExpense as any);

    await expect(
      service.approveExpense(mockRequestingUserEmail, mockId),
    ).rejects.toThrow(BadRequestException);
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request from ${mockRequestingUserEmail} to approve expense with ID: ${mockId}`,
    );
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockId,
    );
  });

  it('should update expense state to APPROVED and return the expense', async () => {
    const mockRequestingUserEmail = faker.internet.email();

    const mockExpenseCreatedByEmail = faker.internet.email();
    const mockExpenseId = faker.string.uuid();
    const mockExpense = {
      id: mockExpenseId,
      createdBy: {
        email: mockExpenseCreatedByEmail,
      },
      approvals: [
        {
          createdBy: {
            email: faker.internet.email(),
          },
        },
      ],
      disputes: [],
    };
    mockExpensesService.getExpenseById.mockResolvedValue(mockExpense as any);

    const mockProperty = {
      rules: {
        numberOfExpenseApprovalsRequired: 1,
      },
    };
    mockPropertiesService.getPropertyForViewing.mockResolvedValue(
      mockProperty as any,
    );

    const mockUser = {
      id: faker.string.uuid(),
      email: mockRequestingUserEmail,
    };
    mockPrismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser);

    mockPrismaService.expense.update = jest.fn();

    const result = await service.approveExpense(
      mockRequestingUserEmail,
      mockExpenseId,
    );
    expect(result).toStrictEqual(mockExpense);
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockExpenseId,
    );
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
      where: {email: mockRequestingUserEmail},
    });
    expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
      where: {id: mockExpenseId},
      data: {
        approvals: {
          create: {
            createdByUserId: mockUser.id,
          },
        },
        disputes: {
          deleteMany: {
            createdByUserId: mockUser.id,
          },
        },
      },
    });
    expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
      where: {id: mockExpenseId},
      data: {state: 'APPROVED'},
    });
  });

  it('should update expense state to APPROVED and return the expense', async () => {
    const mockRequestingUserEmail = faker.internet.email();

    const mockExpenseCreatedByEmail = faker.internet.email();
    const mockExpenseId = faker.string.uuid();
    const mockExpense = {
      id: mockExpenseId,
      createdBy: {
        email: mockExpenseCreatedByEmail,
      },
      approvals: [
        {
          createdBy: {
            email: faker.internet.email(),
          },
        },
      ],
      disputes: [],
    };
    mockExpensesService.getExpenseById.mockResolvedValue(mockExpense as any);

    const mockProperty = {
      rules: {
        numberOfExpenseApprovalsRequired: 2,
      },
    };
    mockPropertiesService.getPropertyForViewing.mockResolvedValue(
      mockProperty as any,
    );

    const mockUser = {
      id: faker.string.uuid(),
      email: mockRequestingUserEmail,
    };
    mockPrismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser);

    mockPrismaService.expense.update = jest.fn();

    const result = await service.approveExpense(
      mockRequestingUserEmail,
      mockExpenseId,
    );
    expect(result).toStrictEqual(mockExpense);
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockExpenseId,
    );
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
      where: {email: mockRequestingUserEmail},
    });
    expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
      where: {id: mockExpenseId},
      data: {
        approvals: {
          create: {
            createdByUserId: mockUser.id,
          },
        },
        disputes: {
          deleteMany: {
            createdByUserId: mockUser.id,
          },
        },
      },
    });
    expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
      where: {id: mockExpenseId},
      data: {state: 'PENDING'},
    });
  });

  it('should update expense state to APPROVED and return the expense', async () => {
    const mockRequestingUserEmail = faker.internet.email();

    const mockExpenseCreatedByEmail = faker.internet.email();
    const mockExpenseId = faker.string.uuid();
    const mockExpense = {
      id: mockExpenseId,
      createdBy: {
        email: mockExpenseCreatedByEmail,
      },
      approvals: [
        {
          createdBy: {
            email: faker.internet.email(),
          },
        },
      ],
      disputes: [
        {
          createdBy: {
            email: faker.internet.email(),
          },
        },
      ],
    };
    mockExpensesService.getExpenseById.mockResolvedValue(mockExpense as any);

    const mockProperty = {
      rules: {
        numberOfExpenseApprovalsRequired: 2,
      },
    };
    mockPropertiesService.getPropertyForViewing.mockResolvedValue(
      mockProperty as any,
    );

    const mockUser = {
      id: faker.string.uuid(),
      email: mockRequestingUserEmail,
    };
    mockPrismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser);

    mockPrismaService.expense.update = jest.fn();

    const result = await service.approveExpense(
      mockRequestingUserEmail,
      mockExpenseId,
    );
    expect(result).toStrictEqual(mockExpense);
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockExpenseId,
    );
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
      where: {email: mockRequestingUserEmail},
    });
    expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
      where: {id: mockExpenseId},
      data: {
        approvals: {
          create: {
            createdByUserId: mockUser.id,
          },
        },
        disputes: {
          deleteMany: {
            createdByUserId: mockUser.id,
          },
        },
      },
    });
    expect(mockPrismaService.expense.update).not.toHaveBeenCalledWith({
      where: {id: mockExpenseId},
      data: {state: 'PENDING'},
    });
    expect(mockPrismaService.expense.update).not.toHaveBeenCalledWith({
      where: {id: mockExpenseId},
      data: {state: 'APPROVED'},
    });
  });

  it('should throw bad request exception when user disputes their own expense', async () => {
    const mockId = faker.string.uuid();
    const mockRequestingUserEmail = faker.internet.email();

    mockExpensesService.getExpenseById.mockResolvedValue({
      createdBy: {
        email: mockRequestingUserEmail,
      },
    } as any);

    await expect(
      service.disputeExpense(mockRequestingUserEmail, mockId),
    ).rejects.toThrow(BadRequestException);
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request from ${mockRequestingUserEmail} to dispute expense with ID: ${mockId}`,
    );
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockId,
    );
  });

  it('should throw bad request exception when user disputes an expense they have already disputed', async () => {
    const mockId = faker.string.uuid();
    const mockRequestingUserEmail = faker.internet.email();

    mockExpensesService.getExpenseById.mockResolvedValue({
      createdBy: {
        email: faker.internet.email(),
      },
      disputes: [
        {
          createdBy: {
            email: mockRequestingUserEmail,
          },
        },
      ],
    } as any);

    await expect(
      service.disputeExpense(mockRequestingUserEmail, mockId),
    ).rejects.toThrow(BadRequestException);
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request from ${mockRequestingUserEmail} to dispute expense with ID: ${mockId}`,
    );
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockId,
    );
  });

  it('should dispute expense, update state to DISPUTED, and return the dispute', async () => {
    const mockId = faker.string.uuid();
    const mockRequestingUserEmail = faker.internet.email();
    const mockRequestingUserId = faker.string.uuid();

    const mockUser = {
      id: mockRequestingUserId,
      email: mockRequestingUserEmail,
    };
    mockPrismaService.user.findUnique = jest.fn().mockResolvedValue(mockUser);

    mockExpensesService.getExpenseById.mockResolvedValue({
      id: mockId,
      createdBy: {
        email: faker.internet.email(),
      },
      disputes: [],
    } as any);
    mockPrismaService.expense.update = jest.fn();

    const mockDispute = {
      expenseId: mockId,
      createdByUserId: mockRequestingUserId,
    };
    mockPrismaService.expenseDispute.create = jest
      .fn()
      .mockResolvedValue(mockDispute);

    const result = await service.disputeExpense(
      mockRequestingUserEmail,
      mockId,
    );
    expect(result).toStrictEqual(mockDispute);
    expect(mockLogger.log).toHaveBeenCalledWith(
      `Request from ${mockRequestingUserEmail} to dispute expense with ID: ${mockId}`,
    );
    expect(mockExpensesService.getExpenseById).toHaveBeenCalledWith(
      mockRequestingUserEmail,
      mockId,
    );
    expect(mockPrismaService.user.findUnique).toHaveBeenCalledWith({
      where: {email: mockRequestingUserEmail},
    });
    expect(mockPrismaService.expenseDispute.create).toHaveBeenCalledWith({
      data: {
        expenseId: mockId,
        createdByUserId: mockRequestingUserId,
      },
    });
    expect(mockPrismaService.expense.update).toHaveBeenCalledWith({
      where: {id: mockId},
      data: {
        state: 'DISPUTED',
        approvals: {
          deleteMany: {
            AND: [
              {
                expenseId: mockId,
              },
              {
                createdByUserId: mockRequestingUserId,
              },
            ],
          },
        },
      },
    });
  });

  it('should throw not found exception if expense not found', async () => {
    const mockRequestingUserEmail = faker.internet.email();
    const mockId = faker.string.uuid();
    const mockText = faker.string.alpha();

    mockExpensesService.getExpenseById.mockRejectedValue(
      new NotFoundException(),
    );

    await expect(
      service.commentOnExpense(mockRequestingUserEmail, mockId, mockText),
    ).rejects.toThrow(NotFoundException);
  });

  it('should throw not found exception if user not found', async () => {
    const mockRequestingUserEmail = faker.internet.email();
    const mockId = faker.string.uuid();
    const mockText = faker.string.alpha();

    mockExpensesService.getExpenseById.mockResolvedValue({} as any);
    mockUsersService.findByEmail.mockRejectedValue(new NotFoundException());

    await expect(
      service.commentOnExpense(mockRequestingUserEmail, mockId, mockText),
    ).rejects.toThrow(NotFoundException);
  });

  it('should create comment with expense ID, requesting user ID, and text', async () => {
    const mockRequestingUserEmail = faker.internet.email();
    const mockRequestingUserId = faker.string.uuid();
    const mockId = faker.string.uuid();
    const mockText = faker.string.alpha();

    mockExpensesService.getExpenseById.mockResolvedValue({
      id: mockId,
    } as any);
    mockUsersService.findByEmail.mockResolvedValue({
      email: mockRequestingUserEmail,
      id: mockRequestingUserId,
    } as any);

    const prismaCreateResult = {
      expenseId: mockId,
      createdByUserId: mockRequestingUserId,
      text: mockText,
    };
    mockPrismaService.expenseComment.create = jest
      .fn()
      .mockResolvedValue(prismaCreateResult);

    const result = await service.commentOnExpense(
      mockRequestingUserEmail,
      mockId,
      mockText,
    );

    expect(result).toStrictEqual(prismaCreateResult);
    expect(mockPrismaService.expenseComment.create).toHaveBeenCalledWith({
      data: {
        expenseId: mockId,
        createdByUserId: mockRequestingUserId,
        text: mockText,
      },
      include: {
        createdBy: {
          include: {
            profile: true,
          },
        },
      },
    });
  });
});
