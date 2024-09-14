import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {PropertyService} from './property.service';

describe('PropertyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PropertyService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', inject([PropertyService], (service: PropertyService) => {
    expect(service).toBeTruthy();
  }));
});
