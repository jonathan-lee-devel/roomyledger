import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {EmailLoginOverlayPanelComponent} from './email-login-overlay-panel.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('EmailLoginOverlayPanelComponent', () => {
  let component: EmailLoginOverlayPanelComponent;
  let fixture: ComponentFixture<EmailLoginOverlayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailLoginOverlayPanelComponent],
      providers: [
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
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailLoginOverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
