import {AsyncPipe, DatePipe, NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {ButtonModule} from 'primeng/button';
import {DialogModule} from 'primeng/dialog';
import {DividerModule} from 'primeng/divider';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {PaginatorModule} from 'primeng/paginator';
import {TableModule} from 'primeng/table';

import {UserAuthenticationStore} from '../../../../../+state/auth/user-auth.store';
import {ExpensesStore} from '../../../../../+state/ledger/expenses/expenses.store';
import {PropertiesStore} from '../../../../../+state/ledger/properties/properties.store';

export interface ExpenseConversationDialogComponentData {
  expenseId: string;
  propertyId: string;
}

@Component({
  selector: 'app-expense-conversation-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    NgOptimizedImage,
    MatListModule,
    MatIconModule,
    DatePipe,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    PaginatorModule,
    ButtonModule,
    AsyncPipe,
    NgIf,
    DialogModule,
    TableModule,
    DividerModule,
  ],
  templateUrl: './expense-conversation-dialog.component.html',
  styleUrl: './expense-conversation-dialog.component.scss',
})
export class ExpenseConversationDialogComponent {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly expensesStore = inject(ExpensesStore);

  protected text: string = '';
}
