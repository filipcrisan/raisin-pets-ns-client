import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Pet } from "../../models/pet.model";
import { PetsFacades } from "../../facades/pets.facades";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { tap } from "rxjs";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

@UntilDestroy()
@Component({
  selector: "app-add-pet-container",
  templateUrl: "./add-pet-container.component.html",
  styleUrls: ["./add-pet-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetContainerComponent {
  petsQuery = this.petsFacades.query;

  constructor(
    private petsFacades: PetsFacades,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute
  ) {}

  onAddPet(pet: Pet): void {
    this.petsFacades
      .addPet(pet)
      .pipe(
        untilDestroyed(this),
        tap({
          next: () => {
            this.routerExtensions
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
