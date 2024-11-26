import {Logger} from '@nestjs/common';
import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';

import {UserEventsHandlerService} from './user-events-handler.service';

describe('UserEventsHandlerService', () => {
  let service: UserEventsHandlerService;
  let mockLogger: Mocked<Logger>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(
      UserEventsHandlerService,
    ).compile();
    service = unit;

    mockLogger = unitRef.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger).toBeDefined();
  });
});
