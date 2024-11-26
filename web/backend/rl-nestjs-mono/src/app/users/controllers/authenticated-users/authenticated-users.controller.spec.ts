import {TestBed} from '@suites/unit';

import {AuthenticatedUsersController} from './authenticated-users.controller';

describe('AuthenticatedUsersController', () => {
  let controller: AuthenticatedUsersController;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(
      AuthenticatedUsersController,
    ).compile();
    controller = unit;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
