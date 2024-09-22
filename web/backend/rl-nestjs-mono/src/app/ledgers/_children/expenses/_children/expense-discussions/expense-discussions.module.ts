import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {ExpenseDiscussionsController} from './controllers/expense-discussions.controller';
import {ExpenseDiscussionsService} from './services/expense-discussions.service';
import {PrismaService} from '../../../../../../prisma/services/prisma.service';
import {StripeService} from '../../../../../payments/_children/stripe/services/stripe.service';
import {PaymentsService} from '../../../../../payments/services/payments.service';
import {SupabaseDbModule} from '../../../../../supabase-db/supabase-db.module';
import {RegistrationService} from '../../../../../users/services/registration/registration.service';
import {UsersService} from '../../../../../users/services/users.service';
import {RandomService} from '../../../../../util/services/random/random.service';
import {PropertiesService} from '../../../properties/services/properties.service';
import {ExpensesService} from '../../services/expenses.service';

@Module({
  controllers: [ExpenseDiscussionsController],
  providers: [
    ExpenseDiscussionsService,
    {
      provide: Logger,
      useFactory: () => new Logger(ExpenseDiscussionsModule.name),
    },
    PrismaService,
    ExpensesService,
    PropertiesService,
    UsersService,
    RandomService,
    RegistrationService,
    JwtService,
    ConfigService,
    PaymentsService,
    StripeService,
  ],
  imports: [SupabaseDbModule],
})
export class ExpenseDiscussionsModule {}
