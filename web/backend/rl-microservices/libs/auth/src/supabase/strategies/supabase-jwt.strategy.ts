import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {JwtService} from '@nestjs/jwt';
import {PassportStrategy} from '@nestjs/passport';
import {EnvironmentVariables} from '@rl-config/config/environment.index';
import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {UNAUTHORIZED} from 'nestjs-supabase-auth';
import {ExtractJwt} from 'passport-jwt';
import {ParsedQs} from 'qs';

import {SupabaseAuthStrategy} from '../passport/passport-supabase.strategy';

@Injectable()
export class SupabaseJwtStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase-jwt',
) {
  public constructor(
    configService: ConfigService<EnvironmentVariables>,
    private readonly jwtService: JwtService,
  ) {
    super({
      supabaseUrl: configService.getOrThrow<string>('SUPABASE_URL'),
      supabaseKey: configService.getOrThrow<string>('SUPABASE_KEY'),
      supabaseOptions: {},
      supabaseJwtSecret: configService.getOrThrow<string>(
        'SUPABASE_JWT_SECRET',
      ),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.getOrThrow<string>('SUPABASE_JWT_SECRET'),
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    await super.validate(payload);
  }

  async authenticate(req: Request<ParamsDictionary, any, any, ParsedQs>) {
    const accessToken = this.extractor(req);
    if (!accessToken) {
      this.fail(UNAUTHORIZED, 401);
      return;
    }
    let payload: any;
    try {
      payload = await this.jwtService.verifyAsync(accessToken);
    } catch (error) {
      this.logger.error(`Error during validation, ${error.message}`);
      this.fail(UNAUTHORIZED, 401);
      return;
    }
    await this.validate(payload);
  }
}
