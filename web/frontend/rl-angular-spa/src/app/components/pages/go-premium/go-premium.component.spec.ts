import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {GoPremiumComponent} from './go-premium.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('GoPremiumComponent', () => {
  let component: GoPremiumComponent;
  let fixture: ComponentFixture<GoPremiumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoPremiumComponent],
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
    fixture = TestBed.createComponent(GoPremiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
