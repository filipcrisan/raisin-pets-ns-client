import {Injectable} from "@angular/core";
import {GoogleSignin} from "@nativescript/google-signin/index.ios";
import {registerElement} from "@nativescript/angular";

@Injectable()
export class AppInitializerService {
  async init() {
    await GoogleSignin.configure();

    registerElement(
      'GoogleSignInButton',
      () => require('@nativescript/google-signin').GoogleSignInButton
    );

    // TODO: load user when you implement Redux
  }
}
