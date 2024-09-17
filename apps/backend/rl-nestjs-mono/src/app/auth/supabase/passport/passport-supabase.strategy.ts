import {Logger} from '@nestjs/common';
import {createClient, SupabaseClient} from '@supabase/supabase-js';
import {Request} from 'express';
import {
  SUPABASE_AUTH,
  SupabaseAuthStrategyOptions,
  SupabaseAuthUser,
  UNAUTHORIZED,
} from 'nestjs-supabase-auth';
import {JwtFromRequestFunction} from 'passport-jwt';
import {Strategy} from 'passport-strategy';

export class SupabaseAuthStrategy extends Strategy {
  protected readonly logger = new Logger(SupabaseAuthStrategy.name);
  readonly name = SUPABASE_AUTH;
  protected supabase: SupabaseClient;
  protected extractor: JwtFromRequestFunction;
  success: (user: any, info: any) => void;
  fail: Strategy['fail'];

  constructor(options: SupabaseAuthStrategyOptions) {
    super();
    if (!options.extractor) {
      throw new Error(
        '\n Extractor is not a function. You should provide an extractor. \n Read the docs: https://github.com/tfarras/nestjs-firebase-auth#readme',
      );
    }

    options.supabaseOptions = {};

    this.supabase = createClient(
      options.supabaseUrl,
      options.supabaseKey,
      options.supabaseOptions,
    );
    this.extractor = options.extractor;
  }

  async validate(payload: any): Promise<SupabaseAuthUser | null> {
    if (payload && Object.keys(payload)?.length > 0) {
      this.success(payload, {});
      return payload;
    }

    this.logger.error(`No payload from validate`);
    this.fail(UNAUTHORIZED, 401);

    return null;
  }

  async authenticate(req: Request): Promise<void> {
    const idToken = this.extractor(req);

    if (!idToken) {
      this.logger.error(
        `No ID token from request authorization header: ${req.header('authorization')}`,
      );
      this.fail(UNAUTHORIZED, 401);
      return;
    }

    try {
      const supabaseResponse = await this.supabase.auth.getUser(idToken);
      await this.validate(supabaseResponse.data.user);
    } catch (err) {
      this.logger.error(`Error during validation, ${err.message}`);
      this.fail(err.message, 401);
    }
  }
}
