import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PetsPageComponent } from "./containers/pets-page/pets-page.component";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthGuard } from "../guards/auth.guard";
import { PetsListContainerComponent } from "./containers/pets-list-container/pets-list-container.component";
import { AddPetContainerComponent } from "./containers/add-pet-container/add-pet-container.component";
import { MenuContainerComponent } from "./containers/menu-container/menu-container.component";
import { EditPetContainerComponent } from "./containers/edit-pet-container/edit-pet-container.component";
import { TutorialsListContainerComponent } from "./containers/tutorials-list-container/tutorials-list-container.component";
import { PetMenuContainerComponent } from "./containers/pet-menu-container/pet-menu-container.component";
import { ExercisesListContainerComponent } from "./containers/exercises-list-container/exercises-list-container.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full",
  },
  {
    path: "dashboard",
    component: PetsPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", pathMatch: "full", redirectTo: "list" },
      {
        path: "list",
        component: PetsListContainerComponent,
      },
      {
        path: "add",
        component: AddPetContainerComponent,
      },
      {
        path: "edit/:id",
        component: EditPetContainerComponent,
      },
      {
        path: "menu/:id",
        component: PetMenuContainerComponent,
      },
      {
        path: "tutorials/:id",
        component: TutorialsListContainerComponent,
      },
      {
        path: "exercises/:id",
        component: ExercisesListContainerComponent,
      },
    ],
  },
  {
    path: "menu",
    component: MenuContainerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class PetsRoutingModule {}
