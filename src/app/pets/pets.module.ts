import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { PetsPageComponent } from "./containers/pets-page/pets-page.component";
import { PetsRoutingModule } from "./pets-routing.module";
import { NativeScriptCommonModule } from "@nativescript/angular";
import { PetsListContainerComponent } from "./containers/pets-list-container/pets-list-container.component";
import { StoreModule } from "@ngrx/store";
import { featureKey, reducers } from "./reducers";
import { PetsListComponent } from "./components/pets-list/pets-list.component";
import { PetsFacades } from "./facades/pets.facades";
import { PetsService } from "./services/pets.service";
import { AddPetContainerComponent } from "./containers/add-pet-container/add-pet-container.component";

@NgModule({
  declarations: [
    PetsPageComponent,
    PetsListContainerComponent,
    PetsListComponent,
    AddPetContainerComponent,
  ],
  imports: [
    NativeScriptCommonModule,
    PetsRoutingModule,
    StoreModule.forFeature(featureKey, reducers),
  ],
  providers: [PetsFacades, PetsService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PetsModule {}
