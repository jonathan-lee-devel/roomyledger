import {TestBed} from '@automock/jest';

import {SupabaseStorageService} from './supabase-storage.service';

describe('SupabaseStorageService', () => {
  let service: SupabaseStorageService;

  beforeEach(async () => {
    const {unit} = TestBed.create(SupabaseStorageService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
