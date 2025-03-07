import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../../lib/auth/supabase/decorators/current-user.decorator';
import {IdParamDto} from '../../../../../lib/validation/id.param.dto';
import {CreateExpenseDto} from '../dto/create-expense.dto';
import {DateRangeDto} from '../dto/date-range.dto';
import {EndDateDto} from '../dto/end-date.dto';
import {StartDateDto} from '../dto/start-date.dto';
import {ExpensesService} from '../services/expenses.service';

@ApiTags('Expenses')
@Controller()
export class ExpensesController {
  constructor(
    private readonly logger: Logger,
    private readonly expensesService: ExpensesService,
  ) {}

  @Get(':id')
  async getExpenseById(
    @CurrentUser() currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    this.logger.log(
      `Request from <${currentUser.email}> to get expense by ID: ${id}`,
    );
    return this.expensesService.getExpenseById(
      currentUser.email?.toLowerCase(),
      id,
    );
  }

  @Post()
  async create(
    @CurrentUser()
    currentUser: AuthUser,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.expensesService.create(
      currentUser.email?.toLowerCase(),
      createExpenseDto,
    );
  }

  @Get('for-property/:id')
  async findAll(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
    @Query() {startDate}: StartDateDto,
    @Query() {endDate}: EndDateDto,
  ) {
    return this.expensesService.findAllForPropertyById(
      currentUser.email?.toLowerCase(),
      id,
      new DateRangeDto(startDate, endDate),
    );
  }

  @Delete(':id')
  async remove(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.expensesService.deleteExpenseById(
      currentUser.email?.toLowerCase(),
      id,
    );
  }
}
