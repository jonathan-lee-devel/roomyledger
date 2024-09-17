import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardTabsComponent} from "./components/dashboard-tabs/dashboard-tabs.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardTabsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PropertyDashboardRoutingModule {}
