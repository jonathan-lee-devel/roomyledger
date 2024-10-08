import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {ExpenseDiscussionsModule} from './_children/expense-discussions/expense-discussions.module';
import {ExpenseDistributionsModule} from './_children/expense-distributions/expense-distributions.module';
import {ExpensesController} from './controllers/expenses.controller';
import {ExpensesService} from './services/expenses.service';
import {PrismaService} from '../../../../lib/prisma/services/prisma.service';
import {SupabaseStorageModule} from '../../../../lib/supabase-storage/supabase-storage.module';
import {RandomService} from '../../../../lib/util/services/random/random.service';
import {StripeService} from '../../../payments/_children/stripe/services/stripe.service';
import {PaymentsService} from '../../../payments/services/payments.service';
import {RegistrationService} from '../../../users/services/registration/registration.service';
import {UsersService} from '../../../users/services/users.service';
import {PropertiesService} from '../properties/services/properties.service';

@Module({
  controllers: [ExpensesController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(ExpensesModule.name),
    },
    ExpensesService,
    PrismaService,
    PropertiesService,
    UsersService,
    JwtService,
    ConfigService,
    RegistrationService,
    RandomService,
    PaymentsService,
    StripeService,
  ],
  imports: [
    ExpenseDiscussionsModule,
    ExpenseDistributionsModule,
    SupabaseStorageModule,
  ],
})
export class ExpensesModule {}
