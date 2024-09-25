import {Logger, Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {APP_GUARD, RouterModule} from '@nestjs/core';
import {EventEmitterModule} from '@nestjs/event-emitter';
import {ThrottlerGuard, ThrottlerModule} from '@nestjs/throttler';
import {AuthModule} from '@rl-auth/auth';
import {SupabaseAuthGuard} from '@rl-auth/auth/supabase/guards/supabase-auth/supabase-auth.guard';
import dotenv from 'dotenv';

import {routes} from './app.routes';
import {CommsModule} from './comms/comms.module';
import {LedgersModule} from './ledgers/ledgers.module';
import {PaymentsModule} from './payments/payments.module';
import {UsersModule} from './users/users.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    RouterModule.register(routes),
    ThrottlerModule.forRoot([
      {
        ttl: 5_000,
        limit: 10,
      },
    ]),
    AuthModule,
    CommsModule,
    PaymentsModule,
    LedgersModule,
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: Logger,
      useFactory: () => new Logger(RlMicroApiGatewayModule.name),
    },
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
export class RlMicroApiGatewayModule {}
