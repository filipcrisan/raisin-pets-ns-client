import { ChangeDetectionStrategy, Component } from "@angular/core";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "app-pets-page",
  templateUrl: "./pets-page.component.html",
  styleUrls: ["./pets-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsPageComponent {
  constructor(private routerExtensions: RouterExtensions) {}

  onNavigateToMenu(): void {
    this.routerExtensions.navigate(["pets/menu"]).then();
  }
}
