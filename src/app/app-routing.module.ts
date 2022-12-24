import {NgModule} from "@angular/core";
import {Routes} from "@angular/router";
import {NativeScriptRouterModule} from "@nativescript/angular";
import {LandingPageContainerComponent} from "~/app/containers/landing-page-container/landing-page-container.component";

const routes: Routes = [
  {
    path: 'pets',
    loadChildren: () => import('./pets/pets.module').then((module) => module.PetsModule),
    title: 'your pets'
  },
  {
    path: '',
    pathMatch: 'full',
    component: LandingPageContainerComponent,
    title: 'raisin\' pets'
  },
  {
    path: '**',
    component: LandingPageContainerComponent,
  },
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {
}
