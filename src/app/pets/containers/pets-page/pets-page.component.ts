import { ChangeDetectionStrategy, Component } from "@angular/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { AuthFacades } from "../../../facades/auth.facades";
import { User } from "../../../models/user.model";

@UntilDestroy()
@Component({
  selector: "app-pets-page",
  templateUrl: "./pets-page.component.html",
  styleUrls: ["./pets-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsPageComponent {
  user: User;

  constructor(private authFacades: AuthFacades) {
    this.authFacades.query.user$.pipe(untilDestroyed(this)).subscribe((x) => {
      this.user = x;
    });
  }

  logout(): void {
    this.authFacades.logout();
  }
}
