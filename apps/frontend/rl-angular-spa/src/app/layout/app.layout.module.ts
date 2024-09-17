import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BadgeModule} from 'primeng/badge';
import {DropdownModule} from 'primeng/dropdown';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextModule} from 'primeng/inputtext';
import {MenuModule} from 'primeng/menu';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import {SidebarModule} from 'primeng/sidebar';
import {StyleClassModule} from 'primeng/styleclass';
import {TooltipModule} from 'primeng/tooltip';

import {AppBreadcrumbComponent} from './app.breadcrumb.component';
import {AppFooterComponent} from './app.footer.component';
import {AppLayoutComponent} from './app.layout.component';
import {AppMenuComponent} from './app.menu.component';
import {AppMenuitemComponent} from './app.menuitem.component';
import {AppSidebarComponent} from './app.sidebar.component';
import {AppTopBarComponent} from './app.topbar.component';
import {AppConfigModule} from './config/config.module';

@NgModule({
  declarations: [
    AppMenuitemComponent,
    AppTopBarComponent,
    AppSidebarComponent,
    AppFooterComponent,
    AppMenuComponent,
    AppLayoutComponent,
    AppBreadcrumbComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    InputTextModule,
    InputSwitchModule,
    MenuModule,
    RouterModule,
    DropdownModule,
    SidebarModule,
    StyleClassModule,
    BadgeModule,
    RadioButtonModule,
    InputSwitchModule,
    RippleModule,
    RouterModule,
    TooltipModule,
    AppConfigModule,
  ],
  exports: [AppLayoutComponent, AppSidebarComponent],
})
export class AppLayoutModule {}
