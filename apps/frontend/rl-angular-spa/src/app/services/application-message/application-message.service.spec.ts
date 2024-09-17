import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {firstValueFrom} from 'rxjs';

import {ApplicationMessageService} from './application-message.service';
import {environment} from '../../../environments/environment';
import {ApplicationMessageDto} from '../../dtos/application-messages/ApplicationMessageDto';

describe('ApplicationMessageService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationMessageService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', inject([ApplicationMessageService], (service: ApplicationMessageService) => {
    expect(service).toBeTruthy();
  }));

  it('should get messages via HTTP', inject([ApplicationMessageService], async (service: ApplicationMessageService) => {
    const applicationMessageDtos: ApplicationMessageDto[] = [
      {
        id: '12345',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        message: 'Test',
        isPublic: true,
        isShow: true,
        routerLink: '/login',
        routerLinkText: 'Login',
        severity: 'INFO',
        title: 'Test',
      },
    ];

    const response$ = service.getPublicApplicationMessage();
    const responsePromise = firstValueFrom(response$);

    const req = httpTestingController.expectOne(`${environment.APPLICATION_MESSAGES_SERVICE_BASE_URL}/public`);
    expect(req.request.method).toBe('GET');
    req.flush(applicationMessageDtos);

    expect(await responsePromise).toEqual(applicationMessageDtos);
    httpTestingController.verify();
  }));
});
