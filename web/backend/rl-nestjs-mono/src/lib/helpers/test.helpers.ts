import {faker} from '@faker-js/faker/locale/en';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import {Client} from 'pg';

import {delayedAction, runPrismaMigrations} from './init-app.helpers';
import {supabaseUserIdKey} from '../constants/auth.constants';

export const initializePostgresTestContainer = async () => {
  const initializedPostgresContainer = await new PostgreSqlContainer().start();
  const initializedPostgresClient = new Client({
    connectionString: initializedPostgresContainer.getConnectionUri(),
  });
  await initializedPostgresClient.connect();
  await runPrismaMigrations(initializedPostgresContainer.getConnectionUri());
  return {initializedPostgresContainer, initializedPostgresClient};
};

export const tearDownPostgresTestContainer = async (
  postgresContainer: StartedPostgreSqlContainer,
  postgresClient: Client,
) => {
  await postgresClient.end();
  await delayedAction(async () => {
    await postgresContainer.stop();
  });
};

export const createMockAuthUser = (overrides?: {
  supabaseUserId?: string;
  email?: string;
  isEmailVerified?: boolean;
  name?: string;
}) => ({
  [supabaseUserIdKey]: overrides?.supabaseUserId ?? faker.string.uuid(),
  email: overrides?.email ?? faker.internet.email(),
  email_verified: overrides?.isEmailVerified ?? true,
  user_metadata: {
    name: overrides?.name ?? faker.internet.displayName(),
  },
});
