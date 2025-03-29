import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Button} from 'primeng/button';
import {ChipsModule} from 'primeng/chips';
import {DropdownModule} from 'primeng/dropdown';
import {FileSelectEvent, FileUploadModule} from 'primeng/fileupload';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {Ripple} from 'primeng/ripple';

import {ExpensesStore} from '../../../../+state/ledger/expenses/expenses.store';
import {PropertiesStore} from '../../../../+state/ledger/properties/properties.store';
import {Currency, CURRENCY_CODES} from '../../../../types';

@Component({
  selector: 'app-expense-create-overlay-panel',
  standalone: true,
  imports: [
    Button,
    OverlayPanelModule,
    InputGroupModule,
    InputGroupAddonModule,
    ChipsModule,
    FormsModule,
    Ripple,
    DropdownModule,
    FileUploadModule,
  ],
  templateUrl: './expense-create-overlay-panel.component.html',
  styleUrl: './expense-create-overlay-panel.component.scss',
})
export class ExpenseCreateOverlayPanelComponent {
  protected readonly propertiesStore = inject(PropertiesStore);
  protected readonly expensesStore = inject(ExpensesStore);

  protected name: string = '';
  protected description: string = '';
  protected amount: number = 0.0;
  protected currencyCode: Currency = 'USD';
  protected expenseProofImages: File[] = [];

  protected readonly validCurrencies = [
    ...CURRENCY_CODES.map((currencyCode) => ({
      code: currencyCode,
      name: currencyCode,
    })),
  ];

  private uploadedFile?: File;

  getCurrencySymbolClass(currencyCode: Currency) {
    if (currencyCode === 'USD') {
      return 'pi-dollar';
    } else if (currencyCode === 'EUR') {
      return 'pi-euro';
    } else if (currencyCode === 'GBP') {
      return 'pi-pound';
    } else {
      return 'pi-dollar';
    }
  }

  doCreateExpense() {
    this.expensesStore.addExpense(
        {
          amount: this.amount,
          name: this.name,
          description: this.description,
          currencyCode: this.currencyCode,
          propertyId: this.propertiesStore.propertyId(),
          uploadedFile: this.uploadedFile,
        },
        this,
    );
  }

  clearForm() {
    this.amount = 0.0;
    this.name = '';
    this.description = '';
    this.expenseProofImages = [];
    this.uploadedFile = undefined;
  }

  selectProofImage(event: FileSelectEvent) {
    this.uploadedFile = event.files[0];
  }
}
