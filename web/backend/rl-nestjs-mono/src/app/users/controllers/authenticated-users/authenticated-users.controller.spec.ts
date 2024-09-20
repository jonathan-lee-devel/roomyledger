import {TestBed} from '@automock/jest';

import {AuthenticatedUsersController} from './authenticated-users.controller';

describe('AuthenticatedUsersController', () => {
  let controller: AuthenticatedUsersController;

  beforeEach(async () => {
    const {unit} = TestBed.create(AuthenticatedUsersController).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
