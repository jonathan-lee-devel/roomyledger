import {CurrencyPipe, NgIf} from '@angular/common';
import {Component, inject, input} from '@angular/core';
import {PrimeTemplate} from 'primeng/api';
import {Button} from 'primeng/button';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';

import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {ExpenseDto, ExpenseStateEnum} from '../../../../dtos/expenses/ExpenseDto';
import {ExpenseActionMenuComponent} from '../expense-action-menu/expense-action-menu.component';

@Component({
  selector: 'app-expense-table',
  standalone: true,
  imports: [
    CurrencyPipe,
    PrimeTemplate,
    TableModule,
    TagModule,
    Button,
    ExpenseActionMenuComponent,
    NgIf,
    ProgressSpinnerModule,
  ],
  templateUrl: './expense-table.component.html',
  styleUrl: './expense-table.component.scss',
})
export class ExpenseTableComponent {
  expenses = input.required<ExpenseDto[]>();
  statusSeverity = input.required<'warning' | 'success' | 'danger'>();
  state = input.required<ExpenseStateEnum>();
  label = input.required<string>();
  protected readonly String = String;
  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly expensesStore = inject(ExpensesStore);
}
