import {faker} from '@faker-js/faker/locale/en';
import {HttpStatus, INestApplication} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {Test, TestingModule} from '@nestjs/testing';
import {StartedPostgreSqlContainer} from '@testcontainers/postgresql';
import {Client} from 'pg';
import * as request from 'supertest';

import {AppModule} from '../src/app/app.module';
import {jestIntegrationTestsTimeout} from '../src/lib/constants/test-containers.constants';
import {initApp} from '../src/lib/helpers/init-app.helpers';
import {
  createMockAuthUser,
  initializePostgresTestContainer,
  tearDownPostgresTestContainer,
} from '../src/lib/helpers/test.helpers';

describe('AppController (e2e)', () => {
  jest.setTimeout(jestIntegrationTestsTimeout);

  let app: INestApplication;
  let postgresContainer: StartedPostgreSqlContainer;
  let postgresClient: Client;

  let accessToken: string;
  const userId: string = faker.string.uuid();
  const email: string = faker.internet.email();

  beforeAll(async () => {
    const {initializedPostgresContainer, initializedPostgresClient} =
      await initializePostgresTestContainer();
    postgresContainer = initializedPostgresContainer;
    postgresClient = initializedPostgresClient;
  });

  afterAll(async () => {
    await tearDownPostgresTestContainer(postgresContainer, postgresClient);
  });

  beforeEach(async () => {
    process.env['DATABASE_URL'] = postgresContainer.getConnectionUri();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    initApp(app);

    await app.init();
    await app.listen(3000);

    accessToken = app.get<JwtService>(JwtService).sign(
      createMockAuthUser({
        supabaseUserId: userId,
        email,
      }),
    );
  });

  afterEach(async () => {
    await app.close();
  });

  it('/v1/application-messages/public (GET)', async () => {
    const payload = {email, displayName: faker.internet.displayName()};

    await request(app.getHttpServer())
      .post('/v1/users/authenticated/check-in')
      .send(payload)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(HttpStatus.CREATED)
      .then((response) => {
        console.log(response.body);
      });

    return await request(app.getHttpServer())
      .get('/v1/application-messages/public')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .set('Authorization', `Bearer ${accessToken}`)
      .expect(200);
  });
});
