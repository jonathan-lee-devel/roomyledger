import {TestBed} from '@automock/jest';
import {faker} from '@faker-js/faker';
import {InternalServerErrorException} from '@nestjs/common';

import {PropertiesService} from './properties.service';
import {PrismaService} from '../../../../../prisma/services/prisma.service';
import {UsersService} from '../../../../users/services/users.service';

describe('PropertiesService', () => {
  let service: PropertiesService;
  let mockUsersService: jest.Mocked<UsersService>;
  let mockPrismaService: jest.Mocked<PrismaService>;

  beforeEach(() => {
    const {unit, unitRef} = TestBed.create(PropertiesService).compile();
    service = unit;

    mockUsersService = unitRef.get<UsersService>(UsersService);
    mockPrismaService = unitRef.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(service.findAllWhereInvolved);
    expect(mockUsersService).toBeDefined();
    expect(mockPrismaService).toBeDefined();
  });

  it('should throw internal server error exception when requesting user not found for find all where involved', async () => {
    const email = faker.internet.email();
    mockUsersService.findByEmail.mockResolvedValue(null);

    await expect(service.findAllWhereInvolved(email)).rejects.toThrow(
      InternalServerErrorException,
    );
    expect(mockUsersService.findByEmail).toHaveBeenCalledWith(email);
  });
});