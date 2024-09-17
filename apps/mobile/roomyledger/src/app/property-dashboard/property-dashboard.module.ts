import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DashboardTabsComponent} from "./components/dashboard-tabs/dashboard-tabs.component";
import {PropertyDashboardRoutingModule} from "./property-dashboard-routing.module";
import {IonicModule} from "@ionic/angular";


@NgModule({
  declarations: [DashboardTabsComponent],
  imports: [
    PropertyDashboardRoutingModule,
    CommonModule,
    IonicModule,
  ]
})
export class PropertyDashboardModule { }
