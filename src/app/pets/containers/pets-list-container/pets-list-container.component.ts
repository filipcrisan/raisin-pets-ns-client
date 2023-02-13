import { ChangeDetectionStrategy, Component, OnInit } from "@angular/core";
import { PetsFacades } from "../../facades/pets.facades";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

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
}
