import {Module} from '@nestjs/common';

import {CustomersController} from './customers/customers.controller';
import {StripeController} from './stripe/stripe.controller';

@Module({
  controllers: [CustomersController, StripeController],
})
export class PaymentsModule {}
