import {AsyncPipe, NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButton} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {SharedModule} from 'primeng/api';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {TableModule} from 'primeng/table';

import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {ExpenseStateEnum} from '../../../../dtos/expenses/ExpenseDto';

export interface YourExpensesBreakdownDialogData {
  convertedSelectedTotalExpenseFilters: ExpenseStateEnum[];
}

@Component({
  selector: 'app-your-expenses-breakdown-dialog',
  standalone: true,
  imports: [
    SharedModule,
    TableModule,
    MatDialogContent,
    MatDialogTitle,
    MatButton,
    MatDialogActions,
    MatDialogClose,
    AsyncPipe,
    NgIf,
  ],
  templateUrl: './your-expenses-breakdown-dialog.component.html',
  styleUrl: './your-expenses-breakdown-dialog.component.scss',
})
export class YourExpensesBreakdownDialogComponent {
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly propertiesStore = inject(PropertiesStore);
  protected convertedSelectedTotalExpenseFilters: ExpenseStateEnum[] = [];

  constructor(
    readonly config: DynamicDialogConfig,
  ) {
    this.convertedSelectedTotalExpenseFilters = (config.data as YourExpensesBreakdownDialogData).convertedSelectedTotalExpenseFilters;
  }
}
