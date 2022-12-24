import {Injectable} from "@angular/core";
import {GoogleSignin} from "@nativescript/google-signin/index.ios";
import {registerElement} from "@nativescript/angular";
import {AuthFacades} from "~/app/facades/auth.facades";

@Injectable()
export class AppInitializerService {
  constructor(private authFacades: AuthFacades) {
  }

  async init() {
    await GoogleSignin.configure();

    registerElement(
      'GoogleSignInButton',
      () => require('@nativescript/google-signin').GoogleSignInButton
    );

    if (!this.authFacades.isUserLoggedIn()) {
      return;
    }

    this.authFacades.loadUser();
  }
}
