import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {PremiumSettingsComponent} from './premium-settings.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('PremiumSettingsComponent', () => {
  let component: PremiumSettingsComponent;
  let fixture: ComponentFixture<PremiumSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PremiumSettingsComponent],
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
    fixture = TestBed.createComponent(PremiumSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
