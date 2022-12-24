import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PetsPageComponent} from './containers/pets-page/pets-page.component';
import {PetsRoutingModule} from "./pets-routing.module";

@NgModule({
  declarations: [
    PetsPageComponent
  ],
  imports: [
    CommonModule,
    PetsRoutingModule
  ]
})
export class PetsModule {
}
