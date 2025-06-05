
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ActivatedRoute} from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {CheckboxModule} from 'primeng/checkbox';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputTextModule} from 'primeng/inputtext';
import {MessagesModule} from 'primeng/messages';
import {RippleModule} from 'primeng/ripple';
import {take, tap} from 'rxjs';

import {UserAuthenticationStore} from '../../../../+state/auth/user-auth.store';
import {SplashBannerComponent} from '../../../lib/splash-banner/splash-banner.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ButtonModule,
    FormsModule,
    InputTextModule,
    FormsModule,
    MatProgressSpinnerModule,
    InputGroupAddonModule,
    InputGroupModule,
    ReactiveFormsModule,
    CardModule,
    CheckboxModule,
    RippleModule,
    MessagesModule,
    SplashBannerComponent
],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);

  private static readonly nextParam = 'next';
  private readonly route = inject(ActivatedRoute);

  ngOnInit() {
    this.route.queryParams
        .pipe(
            take(1),
            tap((queryParams) => {
              if (queryParams[LoginComponent.nextParam]) {
                this.userAuthenticationStore.onLoginPageVisitedWithNext(
                    queryParams[LoginComponent.nextParam],
                );
              }
            }),
        )
        .subscribe();
  }
}
