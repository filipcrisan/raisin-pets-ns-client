import { Injectable } from "@angular/core";
import { HttpHandler, HttpRequest } from "@angular/common/http";
import { AuthFacades } from "../facades/auth.facades";
import { RouterExtensions } from "@nativescript/angular";

@Injectable()
export class AuthInterceptorService {
  constructor(
    private authFacades: AuthFacades,
    private routerExtensions: RouterExtensions
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authFacades.getBearerToken();

    if (token == null) {
      return next.handle(req);
    }

    if (this.authFacades.isTokenExpired(token)) {
      this.routerExtensions.navigate([""]).then();
      return next.handle(req);
    }

    const authRequest = req.clone({
      headers: req.headers.set("Authorization", `Bearer ${token}`),
    });

    return next.handle(authRequest);
  }
}
