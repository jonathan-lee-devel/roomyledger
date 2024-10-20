import {Body, Controller, Param, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../../../../../lib/auth/supabase/decorators/current-user.decorator';
import {IdParamDto} from '../../../../../../../lib/validation/id.param.dto';
import {CreateCommentDto} from '../dto/create-comment.dto';
import {ExpenseDiscussionsService} from '../services/expense-discussions.service';

@ApiTags('Expenses')
@Controller()
export class ExpenseDiscussionsController {
  constructor(
    private readonly expenseDiscussionsService: ExpenseDiscussionsService,
  ) {}

  @Post('approvals/for-expense/:id')
  async approveExpense(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.expenseDiscussionsService.approveExpense(
      currentUser.email?.toLowerCase(),
      id,
    );
  }

  @Post('disputes/for-expense/:id')
  async disputeExpense(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
  ) {
    return this.expenseDiscussionsService.disputeExpense(
      currentUser.email?.toLowerCase(),
      id,
    );
  }

  @Post('comments/for-expense/:id')
  async commentOnExpense(
    @CurrentUser()
    currentUser: AuthUser,
    @Param() {id}: IdParamDto,
    @Body() {text}: CreateCommentDto,
  ) {
    return this.expenseDiscussionsService.commentOnExpense(
      currentUser.email?.toLowerCase(),
      id,
      text,
    );
  }
}
