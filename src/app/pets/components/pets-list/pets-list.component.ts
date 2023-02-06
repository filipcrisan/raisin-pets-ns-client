import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Pet } from "../../models/pet.model";

@Component({
  selector: "app-pets-list",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
  inputs: ["pets"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListComponent {
  @Input() pets: Pet[];
}
