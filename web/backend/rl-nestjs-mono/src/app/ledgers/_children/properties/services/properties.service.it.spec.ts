import {faker} from '@faker-js/faker';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {Test, TestingModule} from '@nestjs/testing';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import {Client} from 'pg';

import {PropertiesService} from './properties.service';
import {jestIntegrationTestsTimeout} from '../../../../../lib/constants/test-containers.constants';
import {PrismaModule} from '../../../../../lib/prisma/prisma.module';
import {
  delayedAction,
  runPrismaMigrations,
} from '../../../../../lib/test-helpers/test-containers.helpers';
import {UtilModule} from '../../../../../lib/util/util.module';
import {PaymentsModule} from '../../../../payments/payments.module';
import {UsersService} from '../../../../users/services/users.service';
import {UsersModule} from '../../../../users/users.module';
import {CreatePropertyDto} from '../dto/create-property.dto';

describe('PropertiesService Integration Tests', () => {
  jest.setTimeout(jestIntegrationTestsTimeout);

  let service: PropertiesService;
  let usersService: UsersService;
  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: Client;

  beforeAll(async () => {
    postgresContainer = await new PostgreSqlContainer().start();
    postgresClient = new Client({
      connectionString: postgresContainer.getConnectionUri(),
    });
    await postgresClient.connect();
    await runPrismaMigrations(postgresContainer.getConnectionUri());
  });

  afterAll(async () => {
    await postgresClient.end();
    await delayedAction(async () => {
      await postgresContainer.stop();
    });
  });

  beforeEach(async () => {
    process.env['DATABASE_URL'] = postgresContainer.getConnectionUri();
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PrismaModule,
        EventEmitterModule.forRoot(),
        UsersModule,
        UtilModule,
        PaymentsModule,
      ],
      providers: [PropertiesService, UsersService],
    }).compile();

    service = module.get<PropertiesService>(PropertiesService);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a property', async () => {
    const requestingUserEmail = faker.internet.email();

    await usersService.createPlaceholderUser(requestingUserEmail);

    const property: CreatePropertyDto = {
      addSelfAsTenant: true,
      name: faker.internet.displayName(),
    };

    const result = await service.createProperty(requestingUserEmail, property);

    const returnedProperty = await service.getPropertyForViewing(
      requestingUserEmail,
      result.id,
    );

    expect(returnedProperty.id).toStrictEqual(result.id);
  });
});
