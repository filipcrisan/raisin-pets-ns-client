import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { PetsFacades } from "../../facades/pets.facades";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { tap } from "rxjs";
import { Pet } from "../../models/pet.model";

@UntilDestroy()
@Component({
  selector: "app-pets-list-container",
  templateUrl: "./pets-list-container.component.html",
  styleUrls: ["./pets-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListContainerComponent implements OnInit {
  petsQuery = this.petsFacades.query.pets;

  pets: Pet[] = [];

  constructor(private petsFacades: PetsFacades) {}

  ngOnInit(): void {
    this.petsFacades
      .getAllPets()
      .pipe(
        untilDestroyed(this),
        tap((pets) => {
          this.pets = pets;
        })
      )
      .subscribe();

    this.petsQuery.entities$
      .pipe(
        untilDestroyed(this),
        tap((pets) => {
          console.log(pets);
        })
      )
      .subscribe();
  }
}
