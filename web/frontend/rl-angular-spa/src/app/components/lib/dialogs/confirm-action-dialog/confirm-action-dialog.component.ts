import {Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

import {ConfirmCallbackFunction} from '../../../../types/confirm-callback-function';

@Component({
  selector: 'app-confirm-action-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  templateUrl: './confirm-action-dialog.component.html',
  styleUrl: './confirm-action-dialog.component.scss',
})
export class ConfirmActionDialogComponent {
  public prompt: string = '';
  public entityId: string = '';
  public data: unknown | undefined = undefined;
  public onConfirmCallback: ConfirmCallbackFunction = () => {};

  confirmAction() {
    if (this.data) {
      this.onConfirmCallback(this.entityId, this.data);
    } else {
      this.onConfirmCallback(this.entityId);
    }
  }
}
