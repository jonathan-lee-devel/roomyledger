import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {provideRouter} from '@angular/router';
import {ConfirmationService, MessageService} from 'primeng/api';

import {PropertiesAcceptInvitationComponent} from './properties-accept-invitation.component';

describe('PropertiesAcceptInvitationComponent', () => {
  let component: PropertiesAcceptInvitationComponent;
  let fixture: ComponentFixture<PropertiesAcceptInvitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertiesAcceptInvitationComponent],
      providers: [
        provideRouter([]),
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertiesAcceptInvitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
