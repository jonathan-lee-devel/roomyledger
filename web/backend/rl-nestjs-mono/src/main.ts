import {Logger, ValidationPipe, VersioningType} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import helmet from 'helmet';

import {AppModule} from './app/app.module';
import {EnvironmentVariables, NodeEnvironment} from './lib/config/environment';

async function bootstrap() {
  const logger = new Logger('Main');
  const app = await NestFactory.create(AppModule, {logger, rawBody: true});
  const configService =
    app.get<ConfigService<EnvironmentVariables>>(ConfigService);

  app.enableCors({
    origin: configService.getOrThrow<string>('FRONT_END_URL').split(','),
    credentials: true,
    allowedHeaders: ['Authorization', 'Content-Type'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  });

  app.use(helmet());

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
    prefix: 'v',
  });
  if (configService.getOrThrow<NodeEnvironment>('NODE_ENV') === 'development') {
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
  }

  app.useGlobalPipes(
    new ValidationPipe({transform: true, validateCustomDecorators: true}),
  );

  logger.log(
    `Running in NODE_ENV: ${configService.getOrThrow<NodeEnvironment>('NODE_ENV')}`,
  );

  const port = 3000;
  logger.log(`Listening on port: ${port}`);
  await app.listen(port);
}
bootstrap().catch((error) => console.error(error));
