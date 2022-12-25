import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { PetsPageComponent } from "./containers/pets-page/pets-page.component";
import { PetsRoutingModule } from "./pets-routing.module";
import { NativeScriptCommonModule } from "@nativescript/angular";

@NgModule({
  declarations: [PetsPageComponent],
  imports: [NativeScriptCommonModule, PetsRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PetsModule {}
