import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {SpanDarkModeComponent} from './span-dark-mode.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('SpanDarkModeComponent', () => {
  let component: SpanDarkModeComponent;
  let fixture: ComponentFixture<SpanDarkModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpanDarkModeComponent],
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
    fixture = TestBed.createComponent(SpanDarkModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
