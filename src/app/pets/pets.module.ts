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
import { EditPetComponent } from "./components/edit-pet/edit-pet.component";
import { EditPetContainerComponent } from "./containers/edit-pet-container/edit-pet-container.component";
import { TutorialsListContainerComponent } from "./containers/tutorials-list-container/tutorials-list-container.component";
import { TutorialsListComponent } from "./components/tutorials-list/tutorials-list.component";
import { PetMenuContainerComponent } from "./containers/pet-menu-container/pet-menu-container.component";
import { ExercisesListContainerComponent } from "./containers/exercises-list-container/exercises-list-container.component";
import { AddExerciseComponent } from "./components/add-exercise/add-exercise.component";
import { AddExerciseContainerComponent } from "./containers/add-exercise-container/add-exercise-container.component";
import { TutorialsService } from "./services/tutorials.service";
import { ExercisesService } from "./services/exercises.service";
import { ExercisesFacades } from "./facades/exercises.facades";
import { ExercisesListComponent } from "./components/exercises-list/exercises-list.component";
import { ExerciseDetailsContainerComponent } from "./containers/exercise-details-container/exercise-details-container.component";
import { ExerciseDetailsComponent } from "./components/exercise-details/exercise-details.component";
import { GoogleMapsModule } from "@nativescript/google-maps/angular";
import { RemindersListContainerComponent } from "./containers/reminders-list-container/reminders-list-container.component";
import { RemindersListComponent } from "./components/reminders-list/reminders-list.component";
import { RemindersFacades } from "./facades/reminders.facades";
import { RemindersService } from "./services/reminders.service";

@NgModule({
  declarations: [
    PetsPageComponent,
    PetsListContainerComponent,
    PetsListComponent,
    AddPetContainerComponent,
    AddPetComponent,
    MenuContainerComponent,
    EditPetComponent,
    EditPetContainerComponent,
    TutorialsListContainerComponent,
    TutorialsListComponent,
    PetMenuContainerComponent,
    ExercisesListContainerComponent,
    AddExerciseComponent,
    AddExerciseContainerComponent,
    ExercisesListComponent,
    ExerciseDetailsContainerComponent,
    ExerciseDetailsComponent,
    RemindersListContainerComponent,
    RemindersListComponent,
  ],
  imports: [
    ReactiveFormsModule,
    NativeScriptFormsModule,
    DropDownModule,
    NativeScriptCommonModule,
    PetsRoutingModule,
    StoreModule.forFeature(featureKey, reducers),
    GoogleMapsModule,
  ],
  providers: [
    PetsFacades,
    PetsService,
    TutorialsService,
    ExercisesService,
    ExercisesFacades,
    RemindersFacades,
    RemindersService,
  ],
  schemas: [NO_ERRORS_SCHEMA],
})
export class PetsModule {}
