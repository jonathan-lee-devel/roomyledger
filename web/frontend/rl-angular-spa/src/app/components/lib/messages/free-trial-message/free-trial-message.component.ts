import {NgClass} from '@angular/common';
import {Component, inject} from '@angular/core';

import {PaymentStore} from '../../../../+state/payment/payment.store';

@Component({
  selector: 'app-free-trial-message',
  standalone: true,
  imports: [NgClass],
  templateUrl: './free-trial-message.component.html',
  styleUrl: './free-trial-message.component.scss',
})
export class FreeTrialMessageComponent {
  protected readonly Number = Number;
  protected readonly paymentStore = inject(PaymentStore);
}
