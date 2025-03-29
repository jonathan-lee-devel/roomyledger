import {Component, inject} from '@angular/core';
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
  imports: [SharedModule, TableModule],
  templateUrl: './your-expenses-breakdown-dialog.component.html',
  styleUrl: './your-expenses-breakdown-dialog.component.scss',
})
export class YourExpensesBreakdownDialogComponent {
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly propertiesStore = inject(PropertiesStore);
  protected convertedSelectedTotalExpenseFilters: ExpenseStateEnum[] = [];

  constructor(readonly config: DynamicDialogConfig) {
    this.convertedSelectedTotalExpenseFilters = (
      config.data as YourExpensesBreakdownDialogData
    ).convertedSelectedTotalExpenseFilters;
  }
}
