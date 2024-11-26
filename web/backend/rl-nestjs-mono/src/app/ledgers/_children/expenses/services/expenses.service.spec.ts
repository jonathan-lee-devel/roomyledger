import {TestBed} from '@suites/unit';

import {ExpensesService} from './expenses.service';

describe('ExpensesService', () => {
  let service: ExpensesService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(ExpensesService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
