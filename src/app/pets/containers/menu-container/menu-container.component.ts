import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AuthFacades } from "../../../facades/auth.facades";
import { RouterExtensions } from "@nativescript/angular";
import { SharedFacades } from "~/app/pets/facades/shared.facades";

@Component({
  selector: "app-menu-container",
  templateUrl: "./menu-container.component.html",
  styleUrls: ["./menu-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContainerComponent {
  authQuery = this.authFacades.query;

  constructor(
    private sharedFacades: SharedFacades,
    private authFacades: AuthFacades,
    private routerExtensions: RouterExtensions
  ) {}

  onClose(): void {
    this.routerExtensions.backToPreviousPage();
  }

  onLogout(): void {
    this.sharedFacades.logout();
  }
}
