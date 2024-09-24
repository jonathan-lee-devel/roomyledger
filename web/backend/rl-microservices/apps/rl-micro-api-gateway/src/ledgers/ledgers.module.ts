import {Module} from '@nestjs/common';

import {ExpensesController} from './expenses/expenses.controller';
import {PropertiesController} from './properties/properties.controller';

@Module({
  controllers: [PropertiesController, ExpensesController],
})
export class LedgersModule {}
