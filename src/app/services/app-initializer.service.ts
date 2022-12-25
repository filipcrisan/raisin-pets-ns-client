import { Injectable } from "@angular/core";
import { GoogleSignin } from "@nativescript/google-signin/index.ios";
import { AuthFacades } from "~/app/facades/auth.facades";

@Injectable()
export class AppInitializerService {
  constructor(private authFacades: AuthFacades) {}

  async init() {
    await GoogleSignin.configure();

    if (!this.authFacades.isUserLoggedIn()) {
      return;
    }

    this.authFacades.loadUser();
  }
}
