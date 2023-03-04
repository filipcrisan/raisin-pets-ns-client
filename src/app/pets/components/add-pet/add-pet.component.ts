import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Species } from "../../models/species.model";
import { Size } from "../../models/size.model";
import { Pet } from "../../models/pet.model";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-add-pet",
  templateUrl: "./add-pet.component.html",
  styleUrls: ["./add-pet.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetComponent {
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;

  @Output() addPet = new EventEmitter<Pet>();

  petForm = new FormGroup({
    name: new FormControl("", Validators.required),
    avatarInBase64: new FormControl(""),
    species: new FormControl(Species.Dog),
    size: new FormControl(Size.Medium),
    dateOfBirth: new FormControl<Date>(new Date(Date.now())),
  });

  species = ["Dog", "Cat"];
  selectedSpeciesIndex = 0;
  sizes = ["Small", "Medium", "Large"];
  selectedSizeIndex = 1;

  onSpeciesChange(args: SelectedIndexChangedEventData) {
    this.petForm.controls.species.setValue(args.newIndex + 1);
  }

  onSizeChange(args: SelectedIndexChangedEventData) {
    this.petForm.controls.size.setValue(args.newIndex + 1);
  }

  onSave(): void {
    if (!this.petForm.valid) {
      return;
    }

    this.addPet.emit(this.formValue);
  }

  get formValue(): Pet {
    return this.petForm.value as Pet;
  }
}
