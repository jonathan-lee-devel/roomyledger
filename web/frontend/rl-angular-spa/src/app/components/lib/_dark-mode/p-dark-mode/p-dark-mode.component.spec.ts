import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {SIGNAL, signalSetFn} from '@angular/core/primitives/signals';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {PDarkModeComponent} from './p-dark-mode.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('PDarkModeComponent', () => {
  let component: PDarkModeComponent;
  let fixture: ComponentFixture<PDarkModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PDarkModeComponent],
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
    fixture = TestBed.createComponent(PDarkModeComponent);
    component = fixture.componentInstance;
    signalSetFn(component.innerText[SIGNAL], 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
