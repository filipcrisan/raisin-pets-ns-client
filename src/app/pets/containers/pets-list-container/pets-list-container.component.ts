import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-pets-list-container",
  templateUrl: "./pets-list-container.component.html",
  styleUrls: ["./pets-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListContainerComponent {}
