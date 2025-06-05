import { NgOptimizedImage } from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

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
    MatButtonModule,
    NgOptimizedImage,
    DialogModule,
    ProgressSpinnerModule
],
  templateUrl: './expense-proof-dialog.component.html',
  styleUrl: './expense-proof-dialog.component.scss',
})
export class ExpenseProofDialogComponent implements OnInit {
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly expenseDescription: string;
  protected readonly submitterDisplayName: string;
  private readonly expenseId: string;

  constructor(readonly config: DynamicDialogConfig) {
    const data = config.data as ExpenseProofDialogData;
    this.expenseDescription = data.expenseDescription;
    this.submitterDisplayName = data.submitterDisplayName;
    this.expenseId = data.expenseId;
  }

  ngOnInit() {
    this.expensesStore.loadExpenseById(this.expenseId);
  }
}
