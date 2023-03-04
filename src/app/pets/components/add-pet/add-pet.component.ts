import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Species } from "../../models/species.model";
import { Size } from "../../models/size.model";
import { Pet } from "../../models/pet.model";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { HttpErrorResponse } from "@angular/common/http";
import { NgChanges } from "../../../shared/models/simple-changes-typed";

@Component({
  selector: "app-add-pet",
  templateUrl: "./add-pet.component.html",
  styleUrls: ["./add-pet.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetComponent implements OnChanges {
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;
  @Input() avatarInBase64: string;

  @Output() addPet = new EventEmitter<Pet>();
  @Output() takePicture = new EventEmitter<void>();

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

  ngOnChanges(changes: NgChanges<AddPetComponent>): void {
    if (changes.avatarInBase64?.currentValue) {
      this.petForm.controls.avatarInBase64.setValue(this.avatarInBase64);
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

    this.addPet.emit(this.formValue);
  }

  onCreateAvatar(): void {
    this.takePicture.emit();
  }

  get formValue(): Pet {
    return this.petForm.value as Pet;
  }
}
