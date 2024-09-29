import {Controller, Get} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {AuthUser} from '@supabase/supabase-js';

import {CurrentUser} from '../../../lib/auth/supabase/decorators/current-user.decorator';
import {PaymentsService} from '../services/payments.service';

@ApiTags('Payments')
@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Get('customer-status')
  async getCustomerPaymentStatus(@CurrentUser() currentUser: AuthUser) {
    return this.paymentsService.getCustomerPaymentStatus(currentUser.email);
  }
}
