import {provideHttpClient} from '@angular/common/http';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

import {ExpenseConversationDialogFooterComponent} from './expense-conversation-dialog-footer.component';
import {
  ExpenseConversationDialogComponentData,
} from '../expense-conversation-dialog/expense-conversation-dialog.component';

describe('ExpenseConversationDialogFooterComponent', () => {
  let component: ExpenseConversationDialogFooterComponent;
  let fixture: ComponentFixture<ExpenseConversationDialogFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpenseConversationDialogFooterComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: DynamicDialogConfig,
          useValue: {
            data: <ExpenseConversationDialogComponentData>{
              propertyId: '12345',
              expenseId: '54321',
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
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseConversationDialogFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
