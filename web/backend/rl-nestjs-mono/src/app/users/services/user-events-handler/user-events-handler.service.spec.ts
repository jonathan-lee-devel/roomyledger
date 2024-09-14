import {TestBed} from '@automock/jest';
import {Logger} from '@nestjs/common';

import {UserEventsHandlerService} from './user-events-handler.service';

describe('UserEventsHandlerService', () => {
  let service: UserEventsHandlerService;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(UserEventsHandlerService).compile();
    service = unit;

    mockLogger = unitRef.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger).toBeDefined();
  });
});
