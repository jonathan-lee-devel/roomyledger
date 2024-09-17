import {AsyncPipe, DatePipe, NgIf} from '@angular/common';
import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton} from '@angular/material/button';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle,
} from '@angular/material/datepicker';
import {
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
} from '@angular/material/form-field';
import {MatInput, MatInputModule} from '@angular/material/input';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {MatOption, MatSelect} from '@angular/material/select';
import {SharedModule} from 'primeng/api';
import {CalendarModule} from 'primeng/calendar';
import {DialogService} from 'primeng/dynamicdialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {TableModule} from 'primeng/table';

import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {ExpenseStateEnum} from '../../../../dtos/expenses/ExpenseDto';
import {UtilService} from '../../../../services/util/util.service';
import {ExpenseActionMenuComponent} from '../../_expenses/expense-action-menu/expense-action-menu.component';
import {
  YourExpensesBreakdownDialogComponent,
  YourExpensesBreakdownDialogData,
} from '../../_expenses/your-expenses-breakdown-dialog/your-expenses-breakdown-dialog.component';

export type ExpenseStateString = 'Approved' | 'Pending' | 'Disputed';

@Component({
  selector: 'app-reports-tab',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    DatePipe,
    ExpenseActionMenuComponent,
    SharedModule,
    TableModule,
    MatButton,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatHint,
    MatInput,
    MatDatepickerInput,
    MatLabel,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinner,
    MultiSelectModule,
    FormsModule,
    MatSelect,
    MatOption,
    CalendarModule,
  ],
  templateUrl: './reports-tab.component.html',
  styleUrl: './reports-tab.component.scss',
})
export class ReportsTabComponent {
  date = input.required<FormControl<Date | null>>();

  @Output() monthAndYearSelected = new EventEmitter<Date>();

  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly utilService = inject(UtilService);
  protected readonly Date = Date;
  protected readonly expenseTotalFilterOptions: {
    name: ExpenseStateString;
    code: ExpenseStateEnum;
  }[] = [
      {name: 'Approved', code: 'APPROVED'},
      {name: 'Pending', code: 'PENDING'},
      {name: 'Disputed', code: 'DISPUTED'},
    ];
  protected selectedTotalExpenseFilters: {
    name: ExpenseStateString;
    code: ExpenseStateEnum;
  }[] = [{name: 'Approved', code: 'APPROVED'}];
  private readonly dialogService = inject(DialogService);

  onMonthAndYearSelected($event: Date) {
    this.monthAndYearSelected.emit($event);
  }

  openYourExpensesBreakdownDialog() {
    this.dialogService.open(YourExpensesBreakdownDialogComponent, {
      data: <YourExpensesBreakdownDialogData>{
        convertedSelectedTotalExpenseFilters:
          this.convertSelectedExpenseFilters(this.selectedTotalExpenseFilters),
      },
      header: 'Your Expenses',
      maximizable: false,
      closable: true,
      width: '80%',
      height: '80%',
    });
  }

  getCurrentDate() {
    return new Date();
  }

  getCurrentDateInMonthYear() {
    const currentMonth = this.getCurrentDate().getMonth() + 1;
    let formattedMonth: string = String(currentMonth);
    if (currentMonth < 10) {
      formattedMonth = '0' + currentMonth;
    }
    return `${formattedMonth}/${this.getCurrentDate().getFullYear()}`;
  }

  getMinDateBasedOnCreatorPaymentStatus() {
    const propertyCreatedDate = new Date(
        this.propertiesStore.propertyById().createdAt,
    );
    if (
      this.propertiesStore.propertyById().creatorPaymentStatus.status ===
      'UNPAID'
    ) {
      const currentDate = new Date();
      currentDate.setMonth(currentDate.getMonth() - 1);
      return this.utilService.getFirstDayOfMonthForDate(
        propertyCreatedDate.getTime() < currentDate.getTime() ?
          currentDate :
          propertyCreatedDate,
      );
    } else {
      return this.utilService.getFirstDayOfMonthForDate(propertyCreatedDate);
    }
  }

  getMaxDate() {
    return this.utilService.getLastDayOfMonthForDate(new Date());
  }

  protected convertSelectedExpenseFilters(
      selectedTotalExpenseFilters: {
      name: ExpenseStateString;
      code: ExpenseStateEnum;
    }[],
  ): ExpenseStateEnum[] {
    return selectedTotalExpenseFilters.map((filter) => filter.code);
  }
}
