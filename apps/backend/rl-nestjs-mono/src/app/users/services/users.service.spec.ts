import {TestBed} from '@automock/jest';

import {UsersService} from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const {unit} = TestBed.create(UsersService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
