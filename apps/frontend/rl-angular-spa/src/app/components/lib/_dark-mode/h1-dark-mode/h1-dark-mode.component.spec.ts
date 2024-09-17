import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {SIGNAL, signalSetFn} from '@angular/core/primitives/signals';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {H1DarkModeComponent} from './h1-dark-mode.component';

class MockDocument {
  getElementById() {
    return {href: '12345'};
  }
}

describe('H1DarkModeComponent', () => {
  let component: H1DarkModeComponent;
  let fixture: ComponentFixture<H1DarkModeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [H1DarkModeComponent],
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
    fixture = TestBed.createComponent(H1DarkModeComponent);
    component = fixture.componentInstance;
    signalSetFn(component.innerText[SIGNAL], 'test');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
