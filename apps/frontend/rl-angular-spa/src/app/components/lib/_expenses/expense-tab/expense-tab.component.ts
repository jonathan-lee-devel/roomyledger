import {AsyncPipe, CurrencyPipe, DatePipe, NgClass, NgIf} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {Button} from 'primeng/button';
import {DividerModule} from 'primeng/divider';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import {RatingModule} from 'primeng/rating';
import {SkeletonModule} from 'primeng/skeleton';
import {TableModule} from 'primeng/table';
import {TagModule} from 'primeng/tag';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {initialPropertyDto} from '../../../../dtos/properties/Property.dto';
import {UtilService} from '../../../../services/util/util.service';
import {
  PropertyInvitePeopleOverlayPanelComponent,
} from '../../_properties/property-invite-people-overlay-panel/property-invite-people-overlay-panel.component';
import {ExpenseActionMenuComponent} from '../expense-action-menu/expense-action-menu.component';
import {
  ExpenseCreateOverlayPanelComponent,
} from '../expense-create-overlay-panel/expense-create-overlay-panel.component';
import {ExpenseTableComponent} from '../expense-table/expense-table.component';

@Component({
  selector: 'app-expense-tab',
  standalone: true,
  imports: [
    MatProgressBarModule,
    NgIf,
    ExpenseActionMenuComponent,
    AsyncPipe,
    MatIconModule,
    DatePipe,
    TableModule,
    MatProgressSpinner,
    PropertyInvitePeopleOverlayPanelComponent,
    ExpenseCreateOverlayPanelComponent,
    DividerModule,
    SkeletonModule,
    TagModule,
    NgClass,
    Button,
    CurrencyPipe,
    RatingModule,
    FormsModule,
    ExpenseTableComponent,
    ProgressSpinnerModule,
  ],
  templateUrl: './expense-tab.component.html',
  styleUrl: './expense-tab.component.scss',
})
export class ExpenseTabComponent implements OnInit {
  private readonly utilService = inject(UtilService);

  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly property = initialPropertyDto;

  ngOnInit() {
    this.expensesStore.loadExpensesForProperty(this.propertiesStore.propertyId(), {
      startDate: this.utilService.formatDate(this.utilService.getFirstDayOfMonthForDate(new Date())),
      endDate: this.utilService.formatDate(this.utilService.getLastDayOfMonthForDate(new Date())),
    });
  }
}
