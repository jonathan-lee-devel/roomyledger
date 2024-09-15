import {CommonModule} from '@angular/common';
import {Component, EventEmitter, inject, input, Output} from '@angular/core';
import {Params, RouterLink} from '@angular/router';
import {ButtonModule} from 'primeng/button';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {H1DarkModeComponent} from '../_dark-mode/h1-dark-mode/h1-dark-mode.component';
import {PDarkModeComponent} from '../_dark-mode/p-dark-mode/p-dark-mode.component';

@Component({
  selector: 'app-card-with-link',
  standalone: true,
  imports: [CommonModule, RouterLink, ButtonModule, PDarkModeComponent, H1DarkModeComponent],
  templateUrl: './card-with-link.component.html',
  styleUrl: './card-with-link.component.scss',
})
export class CardWithLinkComponent {
  cardHeaderText = input.required<string>();
  cardTitle = input.required<string>();
  cardBodyText = input.required<string>();
  cardButtonText = input.required<string>();
  cardButtonTargetLink = input.required<string>();
  cardButtonTargetQueryParams = input<Params>();
  isDeleteButtonShown = input<boolean>(false);
  isFaded = input<boolean>(false);
  entityId = input<string>();
  isDisabled = input<boolean>(false);
  cardTitleClass = input<string>('');
  @Output() actionButtonClicked: EventEmitter<string> = new EventEmitter();
  @Output() deleteButtonClicked: EventEmitter<string> = new EventEmitter();
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
}
