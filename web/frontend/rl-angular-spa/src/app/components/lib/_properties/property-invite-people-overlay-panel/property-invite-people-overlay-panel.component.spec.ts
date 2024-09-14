import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {PropertyInvitePeopleOverlayPanelComponent} from './property-invite-people-overlay-panel.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('PropertyInvitePeopleOverlayPanelComponent', () => {
  let component: PropertyInvitePeopleOverlayPanelComponent;
  let fixture: ComponentFixture<PropertyInvitePeopleOverlayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyInvitePeopleOverlayPanelComponent],
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
    fixture = TestBed.createComponent(
        PropertyInvitePeopleOverlayPanelComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
