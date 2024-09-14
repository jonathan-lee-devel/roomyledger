import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {Ripple} from 'primeng/ripple';

import {ExpensesStore} from '../../../../../+state/ledger/expenses/expenses.store';
import {
  ExpenseConversationDialogComponentData,
} from '../expense-conversation-dialog/expense-conversation-dialog.component';

@Component({
  selector: 'app-expense-conversation-dialog-footer',
  standalone: true,
  imports: [
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    Button,
    Ripple,
    FormsModule,
  ],
  templateUrl: './expense-conversation-dialog-footer.component.html',
  styleUrl: './expense-conversation-dialog-footer.component.scss',
})
export class ExpenseConversationDialogFooterComponent {
  protected readonly expensesStore = inject(ExpensesStore);
  protected text: string = '';

  constructor(private readonly config: DynamicDialogConfig) {
  }

  doAddComment() {
    this.expensesStore.commentOnExpense((this.config.data as ExpenseConversationDialogComponentData).expenseId, this.text);
    this.text = '';
  }
}
