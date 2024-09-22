import {TestBed} from '@automock/jest';

import {SupabaseDbService} from './supabase-db.service';

describe('SupabaseDbService', () => {
  let service: SupabaseDbService;

  beforeEach(async () => {
    const {unit} = TestBed.create(SupabaseDbService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
