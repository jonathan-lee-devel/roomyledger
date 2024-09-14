import {TestBed, inject} from '@angular/core/testing';

import {SupabaseService} from './supabase.service';

describe('SupabaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SupabaseService],
    });
  });

  it('should be created', inject([SupabaseService], (service: SupabaseService) => {
    expect(service).toBeTruthy();
  }));
});
