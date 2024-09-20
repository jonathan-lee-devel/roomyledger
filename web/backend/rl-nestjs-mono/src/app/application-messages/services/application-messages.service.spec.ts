import {TestBed} from '@automock/jest';

import {ApplicationMessagesService} from './application-messages.service';
import {PrismaService} from '../../../prisma/services/prisma.service';

describe('ApplicationMessagesService', () => {
  let service: ApplicationMessagesService;
  let mockPrismaService: jest.Mocked<PrismaService>;

  beforeEach(async () => {
    const {unit, unitRef} = TestBed.create(
      ApplicationMessagesService,
    ).compile();
    service = unit;

    mockPrismaService = unitRef.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mockPrismaService).toBeDefined();
  });
});
