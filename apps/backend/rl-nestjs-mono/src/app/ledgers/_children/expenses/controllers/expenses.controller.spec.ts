import {TestBed} from '@automock/jest';

import {ExpensesController} from './expenses.controller';

describe('ExpensesController', () => {
  let controller: ExpensesController;

  beforeEach(async () => {
    const {unit} = TestBed.create(ExpensesController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
