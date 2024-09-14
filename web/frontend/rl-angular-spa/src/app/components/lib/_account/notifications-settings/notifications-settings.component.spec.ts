import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {NotificationsSettingsComponent} from './notifications-settings.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('NotificationsSettingsComponent', () => {
  let component: NotificationsSettingsComponent;
  let fixture: ComponentFixture<NotificationsSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsSettingsComponent],
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
    fixture = TestBed.createComponent(NotificationsSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
