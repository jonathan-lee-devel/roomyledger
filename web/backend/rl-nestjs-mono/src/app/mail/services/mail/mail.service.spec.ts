import {TestBed} from '@automock/jest';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {MailService} from './mail.service';

describe('MailService', () => {
  let service: MailService;
  let mockLogger: jest.Mocked<Logger>;
  let mockConfigService: jest.Mocked<ConfigService>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(MailService).compile();
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
