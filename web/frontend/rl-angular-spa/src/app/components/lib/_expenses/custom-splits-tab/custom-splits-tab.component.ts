import {NgIf} from '@angular/common';
import {Component, inject} from '@angular/core';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {ExpenseTableComponent} from '../expense-table/expense-table.component';

@Component({
  selector: 'app-custom-splits-tab',
  standalone: true,
  imports: [
    ProgressSpinnerModule,
    ExpenseTableComponent,
    NgIf,
  ],
  templateUrl: './custom-splits-tab.component.html',
  styleUrl: './custom-splits-tab.component.scss',
})
export class CustomSplitsTabComponent {
  protected readonly expensesStore = inject(ExpensesStore);
}
