import {NgOptimizedImage} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

import {ExpensesStore} from '../../../../../+state/ledger/expenses/expenses.store';

export interface ExpenseProofDialogData {
  submitterDisplayName: string;
  expenseDescription: string;
  expenseId: string;
}

@Component({
  selector: 'app-expense-proof-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgOptimizedImage,
    DialogModule,
  ],
  templateUrl: './expense-proof-dialog.component.html',
  styleUrl: './expense-proof-dialog.component.scss',
})
export class ExpenseProofDialogComponent {
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly expenseDescription: string;
  protected readonly submitterDisplayName: string;

  constructor(readonly config: DynamicDialogConfig) {
    const data = (config.data as ExpenseProofDialogData);
    this.expenseDescription = data.expenseDescription;
    this.submitterDisplayName = data.submitterDisplayName;
  }
}
