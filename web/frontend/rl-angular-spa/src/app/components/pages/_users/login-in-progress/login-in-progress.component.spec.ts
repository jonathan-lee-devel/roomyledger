import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

import {LoginInProgressComponent} from './login-in-progress.component';
import {RoutePath} from '../../../../app.routes';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('LoginInProgressComponent', () => {
  let component: LoginInProgressComponent;
  let fixture: ComponentFixture<LoginInProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginInProgressComponent],
      providers: [
        provideRouter([
          {
            path: RoutePath.LOGIN_IN_PROGRESS,
            component: LoginInProgressComponent,
          },
        ]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: MessageService,
          useValue: {},
        },
        {
          provide: ConfirmationService,
          useValue: {},
        },
        {
          provide: Document,
          useClass: MockDocument,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginInProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
