import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

@ApiTags('Ledgers')
@Controller('expenses')
export class ExpensesController {
  @Get('for-property/:id')
  getExpensesForProperty() {
    return [];
  }
}
