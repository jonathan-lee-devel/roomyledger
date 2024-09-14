import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MainMenuComponent} from "./components/main-menu/main-menu.component";
import {IonicModule} from "@ionic/angular";



@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class MainMenuModule { }
