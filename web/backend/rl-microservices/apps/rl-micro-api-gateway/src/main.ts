import {Logger, ValidationPipe, VersioningType} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {NestFactory} from '@nestjs/core';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import {
  EnvironmentVariables,
  NodeEnvironment,
} from '@rl-config/config/environment.index';
import helmet from 'helmet';

import {RlMicroApiGatewayModule} from './rl-micro-api-gateway.module';

async function bootstrap() {
  const logger = new Logger(RlMicroApiGatewayModule.name);
  const app = await NestFactory.create(RlMicroApiGatewayModule);

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

  const port = 8080;
  logger.log(`Listening on port: ${port}`);
  await app.listen(port);
}

bootstrap().catch((reason) => console.error(reason));
