import {TestBed} from '@suites/unit';

import {ExpensesController} from './expenses.controller';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(ExpensesController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
