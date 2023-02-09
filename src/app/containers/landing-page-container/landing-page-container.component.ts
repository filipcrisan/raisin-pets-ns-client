import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthFacades } from "~/app/facades/auth.facades";

@Component({
  selector: "app-landing-page-container",
  templateUrl: "./landing-page-container.component.html",
  styleUrls: ["./landing-page-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageContainerComponent {
  userQuery = this.authFacades.query;

  constructor(private authFacades: AuthFacades) {}

  onSignInWithGoogle(): void {
    this.authFacades.login();
  }
}
