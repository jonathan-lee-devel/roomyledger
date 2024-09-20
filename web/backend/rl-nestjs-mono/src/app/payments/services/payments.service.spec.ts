import {TestBed} from '@automock/jest';
import {Logger} from '@nestjs/common';

import {PaymentsService} from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let mockLogger: jest.Mocked<Logger>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(PaymentsService).compile();
    service = unit;

    mockLogger = unitRef.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger).toBeDefined();
  });
});
