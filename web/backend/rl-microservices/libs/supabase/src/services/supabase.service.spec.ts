import {TestBed} from '@automock/jest';

import {SupabaseService} from './supabase.service';

describe('SupabaseService', () => {
  let service: SupabaseService;

  beforeEach(async () => {
    const {unit} = TestBed.create(SupabaseService).compile();
    service = unit;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
