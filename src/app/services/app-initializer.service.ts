import { Injectable } from "@angular/core";
import { GoogleSignin } from "@nativescript/google-signin";
import { AuthFacades } from "~/app/facades/auth.facades";
import { isAndroid, isIOS } from "@nativescript/core";

@Injectable()
export class AppInitializerService {
  constructor(private authFacades: AuthFacades) {}

  async init() {
    if (isAndroid) {
      await GoogleSignin.configure({
        clientId:
          "934410184091-c2c7tavjvscau815l48a7uemu1c26fam.apps.googleusercontent.com",
      });
    } else if (isIOS) {
      await GoogleSignin.configure();
    } else {
      throw new Error(
        "Login with Google not configured for the current platform."
      );
    }

    if (!this.authFacades.isUserLoggedIn()) {
      return;
    }

    this.authFacades.loadUser();
  }
}
