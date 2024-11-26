import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';

import {MailService} from './mail.service';

describe('MailService', () => {
  let service: MailService;
  let mockLogger: Mocked<Logger>;
  let mockConfigService: Mocked<ConfigService>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(MailService).compile();
    service = unit;

    mockLogger = unitRef.get<Logger>(Logger);
    mockConfigService = unitRef.get<ConfigService>(ConfigService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger).toBeDefined();
    expect(mockConfigService).toBeDefined();
  });
});
