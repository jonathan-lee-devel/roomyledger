import {Logger} from '@nestjs/common';
import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';

import {PaymentsService} from './payments.service';

describe('PaymentsService', () => {
  let service: PaymentsService;
  let mockLogger: Mocked<Logger>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(PaymentsService).compile();
    service = unit;

    mockLogger = unitRef.get<Logger>(Logger);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger).toBeDefined();
  });
});
