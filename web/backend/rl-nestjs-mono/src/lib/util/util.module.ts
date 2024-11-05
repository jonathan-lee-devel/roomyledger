import {Logger, Module} from '@nestjs/common';

import {RandomService} from './services/random/random.service';

@Module({
  providers: [
    {
      provide: Logger,
      useValue: new Logger(UtilModule.name),
    },
    RandomService,
  ],
  exports: [RandomService],
})
export class UtilModule {}
