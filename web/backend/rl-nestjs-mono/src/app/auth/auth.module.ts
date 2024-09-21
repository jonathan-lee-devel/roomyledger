import {Module} from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {PassportModule} from '@nestjs/passport';

import {SupabaseJwtStrategy} from './supabase/strategies/supabase-jwt.strategy';
import {EnvironmentVariables} from '../../config/environment';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (
        configService: ConfigService<EnvironmentVariables>,
      ) => ({
        secret: configService.get('SUPABASE_JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [SupabaseJwtStrategy, ConfigService],
  exports: [],
})
export class AuthModule {}
