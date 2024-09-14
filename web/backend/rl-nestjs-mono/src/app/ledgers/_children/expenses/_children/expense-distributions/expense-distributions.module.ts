import {Module} from '@nestjs/common';

import {ExpenseDistributionsController} from './controllers/expense-distributions.controller';
import {ExpenseDistributionsService} from './services/expense-distributions.service';

@Module({
  controllers: [ExpenseDistributionsController],
  providers: [ExpenseDistributionsService],
})
export class ExpenseDistributionsModule {}
