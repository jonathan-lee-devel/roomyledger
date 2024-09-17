import {TestBed} from '@automock/jest';
import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {Transporter} from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import {MailService} from './mail.service';
import {MailModuleInjectionTokens} from '../../constants/injection-tokens';

describe('MailService', () => {
  let service: MailService;
  let mockLogger: jest.Mocked<Logger>;
  let mockConfigService: jest.Mocked<ConfigService>;
  let mockTransporter: jest.Mocked<Transporter<SMTPTransport.SentMessageInfo>>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(MailService).compile();
    service = unit;

    mockLogger = unitRef.get<Logger>(Logger);
    mockConfigService = unitRef.get<ConfigService>(ConfigService);
    mockTransporter = unitRef.get<Transporter<SMTPTransport.SentMessageInfo>>(
      MailModuleInjectionTokens.NODEMAILER_TRANSPORTER,
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockLogger).toBeDefined();
    expect(mockConfigService).toBeDefined();
    expect(mockTransporter).toBeDefined();
  });
});
