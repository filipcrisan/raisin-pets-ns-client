import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Pet } from "../../models/pet.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Species } from "../../models/species.model";
import { Const } from "../../models/constants.model";
import { Menu } from "nativescript-menu";
import { Page } from "@nativescript/core";

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

  @Output() editDetails = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(private page: Page) {}

  onActionsTap(id: number): void {
    Menu.popup({
      view: this.page.getViewById("menuButton"),
      actions: [
        { id: "1", title: "Edit details" },
        { id: "2", title: "Delete" },
      ],
      cancelButtonText: "Cancel",
    })
      .then((action) => {
        if (action.id !== "1" && action.id !== "2") {
          return;
        }

        if (action.id == "1") {
          this.editDetails.emit(id);
          return;
        }

        this.delete.emit(id);
      })
      .catch(console.log);
  }

  getAvatarUrlOrDefault(pet: Pet): string {
    if (pet.avatarInBase64.length) {
      return pet.avatarInBase64;
    }

    if (pet.species == Species.Dog) {
      return Const.DEFAULT_DOG_AVATAR_URL;
    }

    return Const.DEFAULT_CAT_AVATAR_URL;
  }
}
