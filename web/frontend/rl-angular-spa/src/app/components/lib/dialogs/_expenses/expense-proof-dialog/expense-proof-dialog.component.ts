import {NgIf, NgOptimizedImage} from '@angular/common';
import {Component, inject, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle} from '@angular/material/dialog';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {ProgressSpinnerModule} from 'primeng/progressspinner';

import {ExpensesStore} from '../../../../../+state/ledger/expenses/expenses.store';
import {SupabaseService} from '../../../../../services/supabase/supabase.service';

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
    NgIf,
    ProgressSpinnerModule,
  ],
  templateUrl: './expense-proof-dialog.component.html',
  styleUrl: './expense-proof-dialog.component.scss',
})
export class ExpenseProofDialogComponent implements OnInit {
  protected readonly expensesStore = inject(ExpensesStore);
  protected readonly expenseDescription: string;
  protected readonly submitterDisplayName: string;

  protected photoUrl?: string;

  private readonly supabaseService = inject(SupabaseService);

  protected isLoading: boolean = true;

  constructor(readonly config: DynamicDialogConfig) {
    const data = (config.data as ExpenseProofDialogData);
    this.expenseDescription = data.expenseDescription;
    this.submitterDisplayName = data.submitterDisplayName;
  }

  ngOnInit() {
    this.isLoading = true;
    const filePath = this.expensesStore.expenseById().filePath;
    if (!filePath) {
      this.isLoading = false;
      return;
    }
    this.supabaseService
        .getPhotoUrl('expense-proof-images', filePath.replace('expense-proof-images/', ''))
        .then(({data, error}) => {
          if (error) {
            console.error(error);
            return;
          }
          this.photoUrl = data?.signedUrl;
          this.isLoading = false;
        });
  }
}
