import {Component} from '@angular/core';
import {RouterLink} from '@angular/router';

import {rebaseRoutePath, RoutePath} from '../../../../app.routes';

@Component({
  selector: 'app-pre-alpha-message',
  standalone: true,
  imports: [
    RouterLink,
  ],
  templateUrl: './pre-alpha-message.component.html',
  styleUrl: './pre-alpha-message.component.scss',
})
export class PreAlphaMessageComponent {
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
}
