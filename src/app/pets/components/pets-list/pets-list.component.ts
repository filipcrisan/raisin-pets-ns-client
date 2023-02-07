import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Pet } from "../../models/pet.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Species } from "../../models/species.model";
import { Const } from "../../models/constants.model";

@Component({
  selector: "app-pets-list",
  templateUrl: "./pets-list.component.html",
  styleUrls: ["./pets-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListComponent {
  @Input() pets: Pet[];
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  getAvatarUrlOrDefault(pet: Pet): string {
    if (pet.avatarUrl.length) {
      return pet.avatarUrl;
    }

    if (pet.species == Species.Dog) {
      return Const.DEFAULT_DOG_AVATAR_URL;
    }

    return Const.DEFAULT_CAT_AVATAR_URL;
  }
}
