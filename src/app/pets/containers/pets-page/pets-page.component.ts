import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-pets-page",
  templateUrl: "./pets-page.component.html",
  styleUrls: ["./pets-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsPageComponent {
  constructor(
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute
  ) {}

  onNavigateToMenu(): void {
    this.routerExtensions.navigate(["pets/menu"]).then();
  }
}
