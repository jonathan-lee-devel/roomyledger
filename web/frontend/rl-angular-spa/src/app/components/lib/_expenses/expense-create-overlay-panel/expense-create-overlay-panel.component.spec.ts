import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';

import {ExpenseCreateOverlayPanelComponent} from './expense-create-overlay-panel.component';

describe('ExpenseCreateOverlayPanelComponent', () => {
  let component: ExpenseCreateOverlayPanelComponent;
  let fixture: ComponentFixture<ExpenseCreateOverlayPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseCreateOverlayPanelComponent],
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCreateOverlayPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
