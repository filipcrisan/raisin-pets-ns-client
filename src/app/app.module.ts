import {NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptModule} from "@nativescript/angular";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LandingPageContainerComponent} from "~/app/containers/landing-page-container/landing-page-container.component";

@NgModule({
  declarations: [
    AppComponent,
    LandingPageContainerComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
