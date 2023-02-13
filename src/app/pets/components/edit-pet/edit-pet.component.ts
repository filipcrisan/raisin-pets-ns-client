import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Pet } from "../../models/pet.model";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Species } from "../../models/species.model";
import { Size } from "../../models/size.model";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { NgChanges } from "../../../shared/models/simple-changes-typed";

@Component({
  selector: "app-edit-pet",
  templateUrl: "./edit-pet.component.html",
  styleUrls: ["./edit-pet.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPetComponent implements OnChanges {
  @Input() pet: Pet;
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;

  @Output() editPet = new EventEmitter<Pet>();

  petForm = new FormGroup({
    name: new FormControl("", Validators.required),
    avatarUrl: new FormControl(""),
    species: new FormControl(Species.Dog),
    size: new FormControl(Size.Medium),
    dateOfBirth: new FormControl<Date>(new Date(Date.now())),
  });

  species = ["Dog", "Cat"];
  selectedSpeciesIndex = 0;
  sizes = ["Small", "Medium", "Large"];
  selectedSizeIndex = 1;

  ngOnChanges(changes: NgChanges<EditPetComponent>): void {
    if (changes.pet?.currentValue) {
      this.petForm.patchValue(this.pet);
      this.selectedSpeciesIndex = this.pet.species - 1;
      this.selectedSizeIndex = this.pet.size - 1;
    }
  }

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

    this.editPet.emit({ ...this.formValue, id: this.pet.id });
  }

  get formValue(): Pet {
    return this.petForm.value as Pet;
  }
}
