import {Test, TestingModule} from '@nestjs/testing';

import {ExpenseDistributionsController} from './expense-distributions.controller';
import {ExpenseDistributionsService} from '../services/expense-distributions.service';

describe('ExpenseDistributionsController', () => {
  let controller: ExpenseDistributionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExpenseDistributionsController],
      providers: [ExpenseDistributionsService],
    }).compile();

    controller = module.get<ExpenseDistributionsController>(
      ExpenseDistributionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
