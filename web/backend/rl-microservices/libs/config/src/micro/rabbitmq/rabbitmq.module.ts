import {DynamicModule, Module, Provider} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {ClientProxyFactory, Transport} from '@nestjs/microservices';

import {RabbitmqService} from './services/rabbitmq.service';

interface RabbitmqModuleOptions {
  serviceName: string;
}

@Module({
  providers: [RabbitmqService],
  exports: [RabbitmqService],
})
export class RabbitmqModule {
  static register({serviceName}: RabbitmqModuleOptions): DynamicModule {
    const providers: Provider[] = [
      RabbitmqService,
      {
        provide: serviceName,
        useFactory: (configService: ConfigService) => {
          return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
              urls: [configService.getOrThrow<string>('RABBIT_MQ_URL')],
              queue: configService.getOrThrow<string>(
                `RABBIT_MQ_${serviceName}_QUEUE`,
              ),
              queueOptions: {
                durable: true,
              },
            },
          });
        },
        inject: [ConfigService],
      },
    ];
    return {
      module: RabbitmqModule,
      providers,
      exports: providers,
    };
  }
}
