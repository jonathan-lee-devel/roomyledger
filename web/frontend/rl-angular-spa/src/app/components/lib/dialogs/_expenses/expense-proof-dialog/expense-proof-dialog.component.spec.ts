import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

import {ExpenseProofDialogComponent, ExpenseProofDialogData} from './expense-proof-dialog.component';
import {ExpensesStore} from '../../../../../+state/ledger/expenses/expenses.store';

describe('ExpenseProofDialogComponent', () => {
  let component: ExpenseProofDialogComponent;
  let fixture: ComponentFixture<ExpenseProofDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseProofDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: <ExpenseProofDialogData>{
              expenseDescription: 'Test',
              expenseId: '12345',
              submitterDisplayName: 'Test',
            },
          },
        },
        {
          provide: MessageService,
          useValue: {},
        },
        {
          provide: ConfirmationService,
          useValue: {},
        },
        {
          provide: typeof ExpensesStore,
          useValue: {},
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseProofDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
