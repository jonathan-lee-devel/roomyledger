import {Injectable} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {SupabaseAuthStrategy} from 'nestjs-supabase-auth';
import {ExtractJwt} from 'passport-jwt';
import {ParsedQs} from 'qs';

import {EnvironmentVariables} from '../../../config/environment';

@Injectable()
export class SupabaseStrategy extends PassportStrategy(
  SupabaseAuthStrategy,
  'supabase',
) {
  public constructor(configService: ConfigService<EnvironmentVariables>) {
    super({
      supabaseUrl: configService.getOrThrow<string>('SUPABASE_URL'),
      supabaseKey: configService.getOrThrow<string>('SUPABASE_KEY'),
      supabaseOptions: {},
      supabaseJwtSecret: configService.getOrThrow<string>(
        'SUPABASE_JWT_SECRET',
      ),
      extractor: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: any): Promise<any> {
    await super.validate(payload);
  }

  async authenticate(req: Request<ParamsDictionary, any, any, ParsedQs>) {
    super.authenticate(req);
  }
}
