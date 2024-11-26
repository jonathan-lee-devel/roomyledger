import {execSync} from 'node:child_process';

import {INestApplication, ValidationPipe, VersioningType} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import helmet from 'helmet';

import {defaultIntegrationTestContainerStopDelay} from '../constants/test-containers.constants';

export const initApp = (app: INestApplication) => {
  app.use(helmet());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('RoomyLedger')
    .setDescription('RoomyLedger API')
    .setVersion('0.0.1')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument, {
    customCssUrl:
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js',
    ],
  });

  app.useGlobalPipes(
    new ValidationPipe({transform: true, validateCustomDecorators: true}),
  );
};

export const delayedAction = async (
  callback: () => Promise<void>,
  timeout?: number,
) =>
  new Promise<void>((resolve) =>
    setTimeout(async () => {
      await callback();
      resolve();
    }, timeout ?? defaultIntegrationTestContainerStopDelay),
  );

export const runPrismaMigrations = async (connectionUri: string) => {
  execSync(
    `export DATABASE_URL=${connectionUri} && npx prisma migrate deploy`,
    {
      stdio: 'inherit',
    },
  );
};
