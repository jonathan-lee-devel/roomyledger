import {Injectable} from '@nestjs/common';

import {CreateExpenseDistributionDto} from '../dto/create-expense-distribution.dto';
import {UpdateExpenseDistributionDto} from '../dto/update-expense-distribution.dto';

@Injectable()
export class ExpenseDistributionsService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createExpenseDistributionDto: CreateExpenseDistributionDto) {
    return 'This action adds a new expenseDistribution';
  }

  findAll() {
    return `This action returns all expenseDistributions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseDistribution`;
  }

  update(
    id: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    updateExpenseDistributionDto: UpdateExpenseDistributionDto,
  ) {
    return `This action updates a #${id} expenseDistribution`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseDistribution`;
  }
}
