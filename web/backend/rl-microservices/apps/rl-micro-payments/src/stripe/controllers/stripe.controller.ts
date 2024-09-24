import {
  Controller,
  Get,
  Headers,
  Logger,
  Param,
  Patch,
  Post,
  RawBodyRequest,
  Req,
} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CurrentUser} from '@rl-auth/auth/supabase/decorators/current-user.decorator';
import {Public} from '@rl-auth/auth/supabase/decorators/is-public.decorator';
import {AuthUser} from '@supabase/supabase-js';

import {StripeService} from '../services/stripe.service';

@ApiTags('Payments')
@Controller()
export class StripeController {
  constructor(
    private readonly logger: Logger,
    private readonly stripeService: StripeService,
  ) {}

  @Public()
  @Post('webhook')
  async acceptStripeWebhook(
    @Req() req: RawBodyRequest<unknown>,
    @Headers('stripe-signature') stripeSignature: string,
  ) {
    return this.stripeService.handleWebhookRequest(
      req.rawBody,
      stripeSignature,
    );
  }

  @Get('query-checkout-session/:id')
  async verifyCheckoutSession(@Param('id') id: string) {
    return this.stripeService.verifyCheckoutSessionId(id);
  }

  @Get('subscriptions/for-user')
  async getSubscriptionsForUser(@CurrentUser() currentUser: AuthUser) {
    this.logger.log(
      `Request from <${currentUser.email}> to get subscriptions for user`,
    );
    return this.stripeService.getTrialAndActiveSubscriptionsForEmail(
      currentUser.email,
    );
  }

  @Patch('controls/cancel-subscription')
  async cancelSubscription(@CurrentUser() currentUser: AuthUser) {
    await this.stripeService.cancelSubscriptionsForEmail(currentUser.email);
  }
}
