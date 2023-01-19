import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { PetsPageComponent } from "./containers/pets-page/pets-page.component";
import { NativeScriptRouterModule } from "@nativescript/angular";
import { AuthGuard } from "../guards/auth.guard";
import { PetsListContainerComponent } from "./containers/pets-list-container/pets-list-container.component";

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
    ],
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forChild(routes)],
  exports: [NativeScriptRouterModule],
})
export class PetsRoutingModule {}
