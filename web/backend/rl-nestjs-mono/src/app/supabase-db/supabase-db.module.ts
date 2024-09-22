import {Module} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';

import {SupabaseDbService} from './services/supabase-db/supabase-db.service';

@Module({
  providers: [ConfigService, SupabaseDbService],
  exports: [SupabaseDbService],
})
export class SupabaseDbModule {}
