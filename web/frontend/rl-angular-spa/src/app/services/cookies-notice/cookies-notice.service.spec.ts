import {inject, TestBed} from '@angular/core/testing';
import {DialogService} from 'primeng/dynamicdialog';

import {CookiesNoticeService} from './cookies-notice.service';

describe('CookiesNoticeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CookiesNoticeService,
        {
          provide: DialogService,
          useValue: {},
        },
      ],
    });
  });

  it('should be created', inject([CookiesNoticeService], (service: CookiesNoticeService) => {
    expect(service).toBeTruthy();
  }));
});
