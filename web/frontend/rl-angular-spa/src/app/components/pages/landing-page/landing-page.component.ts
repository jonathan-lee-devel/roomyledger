
import {Component, inject, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DateTime} from 'luxon';
import {MenuItem} from 'primeng/api';
import {AvatarModule} from 'primeng/avatar';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {IconFieldModule} from 'primeng/iconfield';
import {InputGroupModule} from 'primeng/inputgroup';
import {InputGroupAddonModule} from 'primeng/inputgroupaddon';
import {InputIconModule} from 'primeng/inputicon';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MessagesModule} from 'primeng/messages';
import {PasswordModule} from 'primeng/password';
import {StepperModule} from 'primeng/stepper';
import {StyleClassModule} from 'primeng/styleclass';
import {TabMenuModule} from 'primeng/tabmenu';
import {ToggleButtonModule} from 'primeng/togglebutton';

import {UserAuthenticationStore} from '../../../+state/auth/user-auth.store';
import {rebaseRoutePath, RoutePath} from '../../../app.routes';
import {ComponentsAndFeaturesSectionComponent} from '../../lib/landing-page/components-and-features-section/components-and-features-section.component';
import {SplashBannerComponent} from '../../lib/splash-banner/splash-banner.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CardModule,
    InputGroupAddonModule,
    InputGroupModule,
    InputTextModule,
    StepperModule,
    IconFieldModule,
    InputIconModule,
    PasswordModule,
    ToggleButtonModule,
    TabMenuModule,
    MessagesModule,
    InputTextareaModule,
    InputSwitchModule,
    AvatarModule,
    StyleClassModule,
    SplashBannerComponent,
    ComponentsAndFeaturesSectionComponent,
  ],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit {
  protected readonly rebaseRoutePath = rebaseRoutePath;
  protected readonly RoutePath = RoutePath;
  protected readonly userAuthenticationStore = inject(UserAuthenticationStore);
  activeTabLabel?: string = '';
  tabMenuItems: MenuItem[] = [];

  ngOnInit() {
    this.tabMenuItems = [
      {
        label: 'Intro',
        icon: 'pi pi-home',
        command: () => {},
      },
      {
        label: 'Docs',
        icon: 'pi pi-paperclip',
        command: () => {},
      },
      {
        label: 'Donations',
        icon: 'pi pi-dollar',
        command: () => {},
      },
    ];
    this.activeTabLabel = this.tabMenuItems[0].label;
  }

  getCurrentMonth() {
    return DateTime.now().monthLong;
  }

  getCurrentYear() {
    return DateTime.now().year;
  }
}
