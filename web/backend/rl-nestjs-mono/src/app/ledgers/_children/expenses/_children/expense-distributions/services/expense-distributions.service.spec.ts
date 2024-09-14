import {Test, TestingModule} from '@nestjs/testing';

import {ExpenseDistributionsService} from './expense-distributions.service';

describe('ExpenseDistributionsService', () => {
  let service: ExpenseDistributionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExpenseDistributionsService],
    }).compile();

    service = module.get<ExpenseDistributionsService>(
      ExpenseDistributionsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
