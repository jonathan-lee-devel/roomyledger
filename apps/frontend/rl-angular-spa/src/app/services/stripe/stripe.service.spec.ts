import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';

import {StripeService} from './stripe.service';

describe('StripeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StripeService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
  });

  it('should be created', inject([StripeService], (service: StripeService) => {
    expect(service).toBeTruthy();
  }));
});
