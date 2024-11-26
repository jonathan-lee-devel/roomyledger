import {Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {EnvironmentVariables, NodeEnvironment} from './lib/config/environment';
import {initApp, runPrismaMigrations} from './lib/helpers/init-app.helpers';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {logger, rawBody: true});
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  await runPrismaMigrations(configService.getOrThrow<string>('DATABASE_URL'));

  app.enableCors({
    origin: configService.getOrThrow<string>('FRONT_END_URL').split(','),
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  initApp(app);

  logger.log(
    `Running in NODE_ENV: ${configService.getOrThrow<NodeEnvironment>('NODE_ENV')}`,
  );

  const port = 3000;
  logger.log(`Listening on port: ${port}`);
  await app.listen(port);
}
bootstrap().catch((error) => console.error(error));
