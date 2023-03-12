import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { PetsFacades } from "../../facades/pets.facades";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { Dialogs } from "@nativescript/core";

@UntilDestroy()
@Component({
  selector: "app-pets-list-container",
  templateUrl: "./pets-list-container.component.html",
  styleUrls: ["./pets-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetsListContainerComponent implements OnInit {
  petsQuery = this.petsFacades.query.pets;

  constructor(
    private petsFacades: PetsFacades,
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {}

  ngOnInit(): void {
    this.petsFacades.getAllPets().pipe(untilDestroyed(this)).subscribe();
  }

  onAddPet(): void {
    this.routerExtensions.navigate(["pets/dashboard/add"]).then();
  }

  onEditDetails(id: number): void {
    this.routerExtensions.navigate([`pets/dashboard/edit/${id}`]).then();
  }

  onDelete(id: number): void {
    Dialogs.action({
      message: "Are you sure you want to delete this pet?",
      cancelButtonText: "Cancel",
      actions: ["Delete"],
    }).then((result) => {
      if (result === "Delete") {
        this.petsFacades.deletePet(id).pipe(untilDestroyed(this)).subscribe();
      }
    });
  }

  onSelectPet(id: number): void {
    this.routerExtensions.navigate([`pets/dashboard/menu/${id}`]).then();
  }
}
