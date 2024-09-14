import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';

import {CreateExpenseDistributionDto} from '../dto/create-expense-distribution.dto';
import {UpdateExpenseDistributionDto} from '../dto/update-expense-distribution.dto';
import {ExpenseDistributionsService} from '../services/expense-distributions.service';

@ApiTags('Expenses')
@Controller()
export class ExpenseDistributionsController {
  constructor(
    private readonly expenseDistributionsService: ExpenseDistributionsService,
  ) {}

  @Post()
  create(@Body() createExpenseDistributionDto: CreateExpenseDistributionDto) {
    return this.expenseDistributionsService.create(
      createExpenseDistributionDto,
    );
  }

  @Get()
  findAll() {
    return this.expenseDistributionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseDistributionsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseDistributionDto: UpdateExpenseDistributionDto,
  ) {
    return this.expenseDistributionsService.update(
      +id,
      updateExpenseDistributionDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseDistributionsService.remove(+id);
  }
}
