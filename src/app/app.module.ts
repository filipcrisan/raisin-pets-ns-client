import { APP_INITIALIZER, NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import {
  NativeScriptHttpClientModule,
  NativeScriptModule,
  registerElement,
} from "@nativescript/angular";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LandingPageContainerComponent } from "~/app/containers/landing-page-container/landing-page-container.component";
import { AppInitializerService } from "~/app/services/app-initializer.service";
import { AuthService } from "~/app/services/auth.service";
import { AuthFacades } from "~/app/facades/auth.facades";
import { AuthInterceptorService } from "~/app/services/auth-interceptor.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { StoreModule } from "@ngrx/store";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "~/environments/environment";
import { metaReducers, ROOT_REDUCERS } from "~/app/reducers";
import { AuthGuard } from "~/app/guards/auth.guard";
import { Gif } from "nativescript-gif";
import { LandingPageComponent } from "~/app/components/landing-page/landing-page.component";
import { SharedModule } from "~/app/shared/shared.module";

//#region Register elements

registerElement("Gif", () => Gif);

//#endregion

export function initializeApp(appInitializerService: AppInitializerService) {
  return () => appInitializerService.init();
}

const FACADES = [AuthFacades];

const SERVICES = [AppInitializerService, AuthService];

@NgModule({
  declarations: [
    AppComponent,
    LandingPageContainerComponent,
    LandingPageComponent,
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptHttpClientModule,
    StoreModule.forRoot(ROOT_REDUCERS, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      },
    }),
    StoreDevtoolsModule.instrument({
      name: "NgRx raisin pets",
      maxAge: 25,
      logOnly: environment.production,
    }),
    SharedModule.forRoot(),
  ],
  providers: [
    FACADES,
    SERVICES,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppInitializerService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
    AuthGuard,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
