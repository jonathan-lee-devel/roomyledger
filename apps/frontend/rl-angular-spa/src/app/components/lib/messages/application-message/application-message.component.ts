import {NgClass, NgIf} from '@angular/common';
import {Component, input} from '@angular/core';
import {RouterLink} from '@angular/router';

import {rebaseRoutePath, rebaseRoutePathAsString, RoutePath} from '../../../../app.routes';
import {ApplicationMessageSeverity} from '../../../../dtos/application-messages/ApplicationMessageDto';

@Component({
  selector: 'app-application-message',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgClass,
  ],
  templateUrl: './application-message.component.html',
  styleUrl: './application-message.component.scss',
})
export class ApplicationMessageComponent {
  message = input.required<string>();
  severity = input.required<ApplicationMessageSeverity>();
  routerLink = input<string>();
  routerLinkText = input<string>();
  protected readonly RoutePath = RoutePath;
  protected readonly rebaseRoutePath = rebaseRoutePath;

  getRouterRebasedRouterLink(routerLink: string | undefined) {
    return (routerLink) ?
      rebaseRoutePathAsString(routerLink) :
      null;
  }

  getClassBasedOnSeverity(severity: ApplicationMessageSeverity) {
    if (severity === 'INFO') {
      return 'bg-blue-100';
    } else if (severity === 'WARNING') {
      return 'bg-yellow-100';
    } else {
      return 'bg-red-100';
    }
  }
}
