import {TestBed} from '@suites/unit';

import {SupabaseStorageService} from './supabase-storage.service';

describe('SupabaseStorageService', () => {
  let service: SupabaseStorageService;

  beforeEach(async () => {
    const {unit} = await TestBed.solitary(SupabaseStorageService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
