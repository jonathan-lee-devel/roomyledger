import {Injectable, OnModuleInit} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {createClient, SupabaseClient} from '@supabase/supabase-js';

import {EnvironmentVariables} from '../../../../config/environment';

@Injectable()
export class SupabaseDbService implements OnModuleInit {
  private supabase: SupabaseClient;

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  onModuleInit() {
    this.supabase = createClient(
      this.configService.getOrThrow<string>('SUPABASE_URL'),
      this.configService.getOrThrow<string>('SUPABASE_SERVICE_KEY'),
    );
  }

  async generateUrlForImage(bucketName: string, imagePath: string) {
    return this.supabase.storage
      .from(bucketName)
      .createSignedUrl(imagePath, 1800);
  }
}
