import { Injectable } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { HttpErrorResponse } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { GoogleSignin, User } from "@nativescript/google-signin";
import { RouterExtensions } from "@nativescript/angular";
import * as appSettings from "@nativescript/core/application-settings";
import { JwtHelperService } from "nativescript-angular-jwt";
import { Store } from "@ngrx/store";
import { authQuery } from "~/app/reducers/auth.selector";
import { AuthActions } from "~/app/actions";
import { Toasty } from "@triniwiz/nativescript-toasty";

@UntilDestroy()
@Injectable()
export class AuthFacades {
  query = {
    user$: this.store.select(authQuery.getUser),
    userLoading$: this.store.select(authQuery.getUserLoading),
    userError$: this.store.select(authQuery.getUserError),
  };

  constructor(
    private store: Store,
    private authService: AuthService,
    private routerExtensions: RouterExtensions
  ) {}

  login(): void {
    GoogleSignin.signIn()
      .then((googleUser: User) => {
        if (this.isUserLoggedIn()) {
          this.onGoogleSignInOfLoggedInUser(googleUser.idToken);
          return;
        }

        this.onGoogleSignIn(googleUser.idToken);
      })
      .catch(() => {
        new Toasty({
          text: "Google error upon login. Please try again.",
        }).show();
      });
  }

  logout(): void {
    GoogleSignin.signOut()
      .then(() => {
        this.onGoogleSignOut();
      })
      .catch(() => {
        new Toasty({
          text: "Google error upon logout. Please try again.",
        }).show();
      });
  }

  loadUser(): void {
    if (!this.isUserLoggedIn()) {
      return;
    }

    const token = this.getBearerToken();

    this.store.dispatch(AuthActions.loadUser());

    this.authService
      .login(token)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          this.store.dispatch(AuthActions.loadUserSuccess({ user }));
          this.routerExtensions.navigate(["pets"]).then();
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon loading user. Please try again.",
          }).show();

          this.store.dispatch(AuthActions.loadUserFailure({ error }));
        },
      });
  }

  isUserLoggedIn(): boolean {
    const token = this.getBearerToken();

    return token != null && !this.isTokenExpired(token);
  }

  getBearerToken(): string {
    return appSettings.getString("token");
  }

  isTokenExpired(token: string): boolean {
    const jwtHelperService = new JwtHelperService();
    return jwtHelperService.isTokenExpired(token);
  }

  //#region Private methods

  private onGoogleSignIn(token: string): void {
    this.store.dispatch(AuthActions.loadUser());

    this.authService
      .login(token)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (user) => {
          appSettings.setString("token", token);
          this.store.dispatch(AuthActions.loadUserSuccess({ user }));
          this.routerExtensions.navigate(["pets"]).then();
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon authentication. Please try again.",
          }).show();

          this.store.dispatch(AuthActions.loadUserFailure({ error }));
        },
      });
  }

  private onGoogleSignOut(): void {
    this.authService
      .logout()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: () => {
          appSettings.remove("token");
          this.routerExtensions.navigate([""], { clearHistory: true }).then();
          this.store.dispatch(AuthActions.clearState());
        },
        error: () => {
          appSettings.remove("token");
          this.store.dispatch(AuthActions.clearState());

          new Toasty({
            text: "Error upon logout. Please try again.",
          }).show();
        },
      });
  }

  private onGoogleSignInOfLoggedInUser(token: string): void {
    GoogleSignin.signOut()
      .then(() => {
        this.authService
          .logout()
          .pipe(untilDestroyed(this))
          .subscribe({
            next: () => {
              appSettings.remove("token");
              this.onGoogleSignIn(token);
            },
            error: () => {
              new Toasty({
                text: "Error upon logout. Please try again.",
              }).show();
            },
          });
      })
      .catch(() => {
        new Toasty({
          text: "Google error upon logout. Please try again.",
        }).show();
      });
  }

  //#endregion
}
