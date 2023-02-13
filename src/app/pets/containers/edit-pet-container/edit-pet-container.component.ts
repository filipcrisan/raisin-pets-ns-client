import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PetsFacades } from "../../facades/pets.facades";
import { ActivatedRoute, Router } from "@angular/router";
import { Pet } from "../../models/pet.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { map, tap } from "rxjs";

@UntilDestroy()
@Component({
  selector: "app-edit-pet-container",
  templateUrl: "./edit-pet-container.component.html",
  styleUrls: ["./edit-pet-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPetContainerComponent {
  petsQuery = this.petsFacades.query;

  petId!: number;
  pet$ = this.petsQuery.pets.entities$.pipe(
    map((x) => x.find((y) => y.id === this.petId))
  );

  constructor(
    private petsFacades: PetsFacades,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  onEditPet(pet: Pet): void {
    this.petsFacades
      .editPet(pet)
      .pipe(
        untilDestroyed(this),
        tap({
          next: () => {
            this.router
              .navigate(["list"], {
                relativeTo: this.activatedRoute.parent,
              })
              .then();
          },
        })
      )
      .subscribe();
  }
}
