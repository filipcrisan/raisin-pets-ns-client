import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";
import { AuthFacades } from "../facades/auth.facades";
import { RouterExtensions } from "@nativescript/angular";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authFacades: AuthFacades,
    private routerExtensions: RouterExtensions
  ) {}

  canActivate(): boolean {
    if (!this.authFacades.isUserLoggedIn()) {
      this.routerExtensions.navigate([""]).then();
      return false;
    }

    return true;
  }
}
