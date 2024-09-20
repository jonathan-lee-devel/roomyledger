import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter, RouterModule} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

import {LoginSuccessComponent} from './login-success.component';
import {RoutePath} from '../../../../app.routes';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('LoginSuccessComponent', () => {
  let component: LoginSuccessComponent;
  let fixture: ComponentFixture<LoginSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSuccessComponent, RouterModule.forRoot([])],
      providers: [
        provideRouter([
          {
            path: RoutePath.LOGIN_SUCCESS,
            component: LoginSuccessComponent,
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

    fixture = TestBed.createComponent(LoginSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
