import {Mocked} from '@suites/doubles.jest';
import {TestBed} from '@suites/unit';

import {ApplicationMessagesService} from './application-messages.service';
import {PrismaService} from '../../../lib/prisma/services/prisma.service';

describe('ApplicationMessagesService', () => {
  let service: ApplicationMessagesService;
  let mockPrismaService: Mocked<PrismaService>;

  beforeEach(async () => {
    const {unit, unitRef} = await TestBed.solitary(
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
