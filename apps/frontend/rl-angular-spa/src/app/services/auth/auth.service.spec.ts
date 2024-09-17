import {provideHttpClient} from '@angular/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {inject, TestBed} from '@angular/core/testing';
import {firstValueFrom} from 'rxjs';

import {AuthService} from './auth.service';
import {environment} from '../../../environments/environment';
import {UserProfile} from '../../dtos/auth/UserProfile';

describe('AuthService', () => {
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should check in via HTTP', inject([AuthService], async (service: AuthService) => {
    const mockResponse: {isAcknowledged: boolean} = {isAcknowledged: true};
    const mockUserProfile: UserProfile = {
      displayName: 'Test',
      email: 'Test@test.com',
    };

    const response$ = service.checkIn(mockUserProfile);
    const responsePromise = firstValueFrom(response$);

    const req = httpTestingController.expectOne(`${environment.USERS_SERVICE_BASE_URL}/authenticated/check-in`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);

    expect(await responsePromise).toEqual(mockResponse);
    httpTestingController.verify();
  }));
});
