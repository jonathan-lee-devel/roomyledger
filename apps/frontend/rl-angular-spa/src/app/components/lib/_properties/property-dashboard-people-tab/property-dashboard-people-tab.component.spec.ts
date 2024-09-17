import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {PropertyDashboardPeopleTabComponent} from './property-dashboard-people-tab.component';
import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('PropertyDashboardPeopleTabComponent', () => {
  let component: PropertyDashboardPeopleTabComponent;
  let fixture: ComponentFixture<PropertyDashboardPeopleTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyDashboardPeopleTabComponent],
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
          provide: typeof UserAuthenticationStore,
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
    fixture = TestBed.createComponent(PropertyDashboardPeopleTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
