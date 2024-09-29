import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {SupabaseStorageService} from './services/supabase-db/supabase-storage.service';

@Module({
  providers: [ConfigService, SupabaseStorageService],
  exports: [SupabaseStorageService],
})
export class SupabaseStorageModule {}
