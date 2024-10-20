import {TestBed} from '@automock/jest';
import {faker} from '@faker-js/faker';
import {AuthUser} from '@supabase/supabase-js';

import {ExpenseDiscussionsController} from './expense-discussions.controller';
import {ExpenseDiscussionsService} from '../services/expense-discussions.service';

describe('ExpenseDiscussionsController', () => {
  let controller: ExpenseDiscussionsController;
  let mockExpenseDiscussionService: jest.Mocked<ExpenseDiscussionsService>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(
      ExpenseDiscussionsController,
    ).compile();
    controller = unit;

    mockExpenseDiscussionService = unitRef.get<ExpenseDiscussionsService>(
      ExpenseDiscussionsService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(mockExpenseDiscussionService).toBeDefined();
  });

  it('should approve expense by ID using current user email', async () => {
    const currentUser = {email: faker.internet.email()};
    const id = faker.string.uuid();
    const serviceResult = {email: currentUser.email, id};

    mockExpenseDiscussionService.approveExpense.mockResolvedValue(
      serviceResult as any,
    );

    const result = await controller.approveExpense(currentUser as AuthUser, {
      id,
    });

    expect(mockExpenseDiscussionService.approveExpense).toHaveBeenCalledWith(
      currentUser.email.toLowerCase(),
      id,
    );
    expect(result).toStrictEqual(serviceResult);
  });

  it('should dispute expense by ID using current user email', async () => {
    const currentUser = {email: faker.internet.email()};
    const id = faker.string.uuid();
    const serviceResult = {email: currentUser.email, id};

    mockExpenseDiscussionService.disputeExpense.mockResolvedValue(
      serviceResult as any,
    );

    const result = await controller.disputeExpense(currentUser as AuthUser, {
      id,
    });

    expect(mockExpenseDiscussionService.disputeExpense).toHaveBeenCalledWith(
      currentUser.email.toLowerCase(),
      id,
    );
    expect(result).toStrictEqual(serviceResult);
  });

  it('should comment on expense by ID using current user email and comment text', async () => {
    const currentUser = {email: faker.internet.email()};
    const id = faker.string.uuid();
    const text = faker.lorem.sentence();
    const serviceResult = {email: currentUser.email, id, text};

    mockExpenseDiscussionService.commentOnExpense.mockResolvedValue(
      serviceResult as any,
    );

    const result = await controller.commentOnExpense(
      currentUser as AuthUser,
      {id},
      {text},
    );

    expect(mockExpenseDiscussionService.commentOnExpense).toHaveBeenCalledWith(
      currentUser.email.toLowerCase(),
      id,
      text,
    );
    expect(result).toStrictEqual(serviceResult);
  });
});
