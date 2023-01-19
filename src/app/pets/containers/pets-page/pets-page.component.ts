import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-pets-page",
  templateUrl: "./pets-page.component.html",
  styleUrls: ["./pets-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsPageComponent {}
