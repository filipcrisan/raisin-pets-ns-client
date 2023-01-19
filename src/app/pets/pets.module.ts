import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { PetsPageComponent } from "./containers/pets-page/pets-page.component";
import { PetsRoutingModule } from "./pets-routing.module";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { PetsListContainerComponent } from "./containers/pets-list-container/pets-list-container.component";

@NgModule({
  declarations: [PetsPageComponent, PetsListContainerComponent],
  imports: [NativeScriptCommonModule, PetsRoutingModule],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PetsModule {}
