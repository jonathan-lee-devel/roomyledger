import {AsyncPipe, NgIf} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {DialogService} from 'primeng/dynamicdialog';
import {FileUploadModule} from 'primeng/fileupload';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {ExpenseDto, initialExpenseDto} from '../../../../dtos/expenses/ExpenseDto';
import {PropertyDto} from '../../../../dtos/properties/Property.dto';
import {SupabaseService} from '../../../../services/supabase/supabase.service';
import {
  ExpenseConversationDialogComponent,
  ExpenseConversationDialogComponentData,
} from '../../dialogs/_expenses/expense-conversation-dialog/expense-conversation-dialog.component';
import {
  ExpenseConversationDialogFooterComponent,
} from '../../dialogs/_expenses/expense-conversation-dialog-footer/expense-conversation-dialog-footer.component';
import {
  ExpenseProofDialogComponent,
  ExpenseProofDialogData,
} from '../../dialogs/_expenses/expense-proof-dialog/expense-proof-dialog.component';

@Component({
  selector: 'app-expense-action-menu',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, NgIf, AsyncPipe, FileUploadModule],
  templateUrl: './expense-action-menu.component.html',
  styleUrl: './expense-action-menu.component.scss',
})
export class ExpenseActionMenuComponent {
  propertyId = input.required<string>();
  expenseId = input.required<string>();

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly dialogService = inject(DialogService);

  protected readonly initialExpenseDto = initialExpenseDto;

  protected property?: PropertyDto;

  private readonly supabaseService = inject(SupabaseService);

  doDeleteExpense() {
    this.expensesStore.promptDeleteExpenseById(this.expenseId());
  }

  openProofDialog(expense: ExpenseDto) {
    this.expensesStore.updateExpenseById(expense.id);
    this.dialogService.open(ExpenseProofDialogComponent, {
      data: <ExpenseProofDialogData>{
        submitterDisplayName: expense.createdBy.profile.displayName,
        expenseDescription: expense.description,
        expenseId: expense.id,
      },
      header: expense.name,
      maximizable: false,
      closable: true,
      width: '80%',
      height: '80%',
    });
  }

  openConversationDialog(expenseObserved: ExpenseDto) {
    this.expensesStore.updateExpenseById(expenseObserved.id);
    this.dialogService.open(ExpenseConversationDialogComponent, {
      data: <ExpenseConversationDialogComponentData>{
        expenseId: expenseObserved.id,
        propertyId: this.propertyId(),
      },
      templates: {
        footer: ExpenseConversationDialogFooterComponent,
      },
      header: expenseObserved.name,
      maximizable: false,
      closable: true,
      width: '80%',
      height: '80%',
    });
  }

  approveExpense(expense: ExpenseDto) {
    this.expensesStore.approveExpense(expense.id);
  }

  disputeExpense(expense: ExpenseDto) {
    this.expensesStore.disputeExpense(expense.id);
  }
}
