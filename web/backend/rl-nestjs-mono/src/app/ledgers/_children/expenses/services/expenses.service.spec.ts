import {TestBed} from '@automock/jest';

import {ExpensesService} from './expenses.service';

describe('ExpensesService', () => {
  let service: ExpensesService;

  beforeEach(async () => {
    const {unit} = TestBed.create(ExpensesService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
