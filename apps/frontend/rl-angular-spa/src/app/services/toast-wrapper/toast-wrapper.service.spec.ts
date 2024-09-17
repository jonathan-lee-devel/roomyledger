import {inject, TestBed} from '@angular/core/testing';
import {MessageService} from 'primeng/api';

import {ToastWrapperService} from './toast-wrapper.service';

describe('ToastWrapperService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ToastWrapperService,
        {provide: MessageService, useValue: {}},
      ],
    });
  });

  it('should be created', inject([ToastWrapperService], (service: ToastWrapperService) => {
    expect(service).toBeTruthy();
  }));
});
