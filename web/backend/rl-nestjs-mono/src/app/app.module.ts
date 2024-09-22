import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_GUARD, RouterModule} from '@nestjs/core';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';

import {routes} from './app.routing';
import {ApplicationMessagesModule} from './application-messages/application-messages.module';
import {AuthModule} from './auth/auth.module';
import {SupabaseAuthGuard} from './auth/supabase/guards/supabase-auth/supabase-auth.guard';
import {ExpensesModule} from './ledgers/_children/expenses/expenses.module';
import {PropertiesModule} from './ledgers/_children/properties/properties.module';
import {NotificationsModule} from './notifications/notifications.module';
import {PaymentsModule} from './payments/payments.module';
import {UsersModule} from './users/users.module';
import {UtilModule} from './util/util.module';
import {PrismaModule} from '../prisma/prisma.module';
import { SupabaseDbModule } from './supabase-db/supabase-db.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RouterModule.register(routes),
    EventEmitterModule.forRoot(),
    ThrottlerModule.forRoot([
      {
        ttl: 5_000,
        limit: 10,
      },
    ]),
    PrismaModule,
    PropertiesModule,
    ExpensesModule,
    PaymentsModule,
    UsersModule,
    ApplicationMessagesModule,
    NotificationsModule,
    UtilModule,
    AuthModule,
    SupabaseDbModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_GUARD,
      useClass: SupabaseAuthGuard,
    },
  ],
})
export class AppModule {}
