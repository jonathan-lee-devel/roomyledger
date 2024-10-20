import {Logger, Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';

import {ExpenseDiscussionsModule} from './_children/expense-discussions/expense-discussions.module';
import {ExpenseDistributionsModule} from './_children/expense-distributions/expense-distributions.module';
import {ExpensesController} from './controllers/expenses.controller';
import {ExpensesService} from './services/expenses.service';
import {PrismaModule} from '../../../../lib/prisma/prisma.module';
import {SupabaseStorageModule} from '../../../../lib/supabase-storage/supabase-storage.module';
import {UsersModule} from '../../../users/users.module';
import {PropertiesModule} from '../properties/properties.module';

@Module({
  imports: [
    PrismaModule,
    ExpenseDiscussionsModule,
    ExpenseDistributionsModule,
    SupabaseStorageModule,
    UsersModule,
    PropertiesModule,
  ],
  controllers: [ExpensesController],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(ExpensesModule.name),
    },
    ExpensesService,
    JwtService,
    ConfigService,
  ],
})
export class ExpensesModule {}
