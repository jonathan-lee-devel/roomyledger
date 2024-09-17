import {BadRequestException, Injectable, Logger} from '@nestjs/common';

import {PrismaService} from '../../../../../../../prisma/services/prisma.service';
import {UsersService} from '../../../../../../users/services/users.service';
import {PropertiesService} from '../../../../properties/services/properties.service';
import {ExpensesService} from '../../../services/expenses.service';

@Injectable()
export class ExpenseDiscussionsService {
  constructor(
    private readonly logger: Logger,
    private readonly prismaService: PrismaService,
    private readonly expensesService: ExpensesService,
    private readonly propertiesService: PropertiesService,
    private readonly usersService: UsersService,
  ) {}

  async approveExpense(requestingUserEmail: string, id: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to approve expense with ID: ${id}`,
    );
    const expense = await this.expensesService.getExpense(
      requestingUserEmail,
      id,
    );
    if (expense.createdBy.email === requestingUserEmail) {
      throw new BadRequestException('You cannot approve your own expense');
    }
    if (
      expense.approvals
        .map((approval) => approval.createdBy.email)
        .includes(requestingUserEmail)
    ) {
      throw new BadRequestException(
        `Expense with ID: ${id} has already been approved by ${requestingUserEmail}`,
      );
    }
    const user = await this.prismaService.user.findUnique({
      where: {email: requestingUserEmail},
    });
    await this.prismaService.expense.update({
      where: {id},
      data: {
        approvals: {
          create: {
            createdByUserId: user.id,
          },
        },
        disputes: {
          deleteMany: {
            createdByUserId: user.id,
          },
        },
      },
    });
    const updatedExpense = await this.expensesService.getExpense(
      requestingUserEmail,
      id,
    );
    const numberOfApprovalsRequired = (
      await this.propertiesService.getPropertyForViewing(
        requestingUserEmail,
        expense.propertyId,
      )
    ).rules.numberOfExpenseApprovalsRequired;
    if (
      updatedExpense.approvals.length >= numberOfApprovalsRequired &&
      updatedExpense.disputes.length < 1
    ) {
      await this.prismaService.expense.update({
        where: {id: expense.id},
        data: {state: 'APPROVED'},
      });
      return this.expensesService.getExpense(requestingUserEmail, id);
    } else if (
      updatedExpense.approvals.length < numberOfApprovalsRequired &&
      updatedExpense.disputes.length < 1
    ) {
      await this.prismaService.expense.update({
        where: {id: expense.id},
        data: {state: 'PENDING'},
      });
      return this.expensesService.getExpense(requestingUserEmail, id);
    }
    return updatedExpense;
  }

  async disputeExpense(requestingUserEmail: string, id: string) {
    this.logger.log(
      `Request from ${requestingUserEmail} to dispute expense with ID: ${id}`,
    );
    const expense = await this.expensesService.getExpense(
      requestingUserEmail,
      id,
    );
    if (expense.createdBy.email === requestingUserEmail) {
      throw new BadRequestException('You cannot dispute your own expense');
    }
    if (
      expense.disputes
        .map((dispute) => dispute.createdBy.email)
        .includes(requestingUserEmail)
    ) {
      throw new BadRequestException(
        `Expense with ID: ${id} has already been disputed by ${requestingUserEmail}`,
      );
    }
    const user = await this.prismaService.user.findUnique({
      where: {email: requestingUserEmail},
    });
    const dispute = await this.prismaService.expenseDispute.create({
      data: {
        expenseId: expense.id,
        createdByUserId: user.id,
      },
    });

    await this.prismaService.expense.update({
      where: {id: expense.id},
      data: {
        state: 'DISPUTED',
        approvals: {
          deleteMany: {
            AND: [
              {
                expenseId: expense.id,
              },
              {
                createdByUserId: user.id,
              },
            ],
          },
        },
      },
    });
    return dispute;
  }

  async commentOnExpense(
    requestingUserEmail: string,
    id: string,
    text: string,
  ) {
    this.logger.log(
      `Request from ${requestingUserEmail} to comment on expense with ID: ${id}`,
    );
    const expense = await this.expensesService.getExpense(
      requestingUserEmail,
      id,
    );
    const user = await this.usersService.findByEmail(requestingUserEmail);
    return this.prismaService.expenseComment.create({
      data: {
        expenseId: expense.id,
        createdByUserId: user.id,
        text,
      },
      include: {
        createdBy: {
          include: {
            profile: true,
          },
        },
      },
    });
  }
}
