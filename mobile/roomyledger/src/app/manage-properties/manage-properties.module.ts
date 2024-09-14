import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManagePropertiesComponent} from "./components/manage-properties/manage-properties.component";
import {IonicModule} from "@ionic/angular";
import {ManagePropertiesRoutingModule} from "./manage-properties-routing.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [ManagePropertiesComponent],
  imports: [
    ManagePropertiesRoutingModule,
    CommonModule,
    RouterModule,
    IonicModule
  ]
})
export class ManagePropertiesModule { }
