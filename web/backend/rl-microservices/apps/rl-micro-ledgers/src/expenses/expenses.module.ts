import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {ExpenseDiscussionsModule} from './_children/expense-discussions/expense-discussions.module';
import {ExpenseDistributionsModule} from './_children/expense-distributions/expense-distributions.module';
import {ExpensesController} from './controllers/expenses.controller';
import {ExpensesService} from './services/expenses.service';
import {PrismaService} from '../../../../prisma/services/prisma.service';
import {StripeService} from '../../../payments-grpc/_children/stripe/services/stripe.service';
import {PaymentsService} from '../../../payments-grpc/services/payments-grpc.service';
import {SupabaseDbModule} from '../../../supabase-db/supabase-db.module';
import {RegistrationService} from '../../../users/services/registration/registration.service';
import {UsersService} from '../../../users/services/users.service';
import {RandomService} from '../../../util/services/random/random.service';
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
    SupabaseDbModule,
  ],
})
export class ExpensesModule {}
