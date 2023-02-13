import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { PetsPageComponent } from "./containers/pets-page/pets-page.component";
import { PetsRoutingModule } from "./pets-routing.module";
import {
  NativeScriptCommonModule,
  NativeScriptFormsModule,
} from "@nativescript/angular";
import { PetsListContainerComponent } from "./containers/pets-list-container/pets-list-container.component";
import { StoreModule } from "@ngrx/store";
import { featureKey, reducers } from "./reducers";
import { PetsListComponent } from "./components/pets-list/pets-list.component";
import { PetsFacades } from "./facades/pets.facades";
import { PetsService } from "./services/pets.service";
import { AddPetContainerComponent } from "./containers/add-pet-container/add-pet-container.component";
import { AddPetComponent } from "./components/add-pet/add-pet.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DropDownModule } from "nativescript-drop-down/angular";
import { MenuContainerComponent } from "./containers/menu-container/menu-container.component";

@NgModule({
  declarations: [
    PetsPageComponent,
    PetsListContainerComponent,
    PetsListComponent,
    AddPetContainerComponent,
    AddPetComponent,
    MenuContainerComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NativeScriptFormsModule,
    DropDownModule,
    NativeScriptCommonModule,
    PetsRoutingModule,
    StoreModule.forFeature(featureKey, reducers),
  ],
  providers: [PetsFacades, PetsService],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PetsModule {}
