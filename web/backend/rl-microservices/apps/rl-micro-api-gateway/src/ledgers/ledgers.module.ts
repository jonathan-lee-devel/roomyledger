import { Module } from '@nestjs/common';
import { PropertiesController } from './properties/properties.controller';
import { ExpensesController } from './expenses/expenses.controller';

@Module({
  controllers: [PropertiesController, ExpensesController]
})
export class LedgersModule {}
