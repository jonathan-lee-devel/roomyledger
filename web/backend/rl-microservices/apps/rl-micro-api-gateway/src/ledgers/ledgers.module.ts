import {Logger, Module} from '@nestjs/common';

import {ExpensesController} from './expenses/expenses.controller';
import {PropertiesController} from './properties/properties.controller';

@Module({
  controllers: [PropertiesController, ExpensesController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(LedgersModule.name),
    },
  ],
})
export class LedgersModule {}
