import {APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA} from "@angular/core";
import {NativeScriptHttpClientModule, NativeScriptModule} from "@nativescript/angular";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {LandingPageContainerComponent} from "~/app/containers/landing-page-container/landing-page-container.component";
import {AppInitializerService} from "~/app/services/app-initializer.service";
import {AuthService} from "~/app/services/auth.service";
import {AuthFacades} from "~/app/facades/auth.facades";
import {AuthInterceptorService} from "~/app/services/auth-interceptor.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.init();
}

const FACADES = [
  AuthFacades
];

const SERVICES = [
  AppInitializerService,
  AuthService
];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageContainerComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
  ],
  providers: [
    FACADES,
    SERVICES,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule {
}
