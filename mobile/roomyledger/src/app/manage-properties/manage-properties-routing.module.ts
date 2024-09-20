import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ManagePropertiesComponent} from "./components/manage-properties/manage-properties.component";

const routes: Routes = [
  {
    path: '',
    component: ManagePropertiesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ManagePropertiesRoutingModule {}
