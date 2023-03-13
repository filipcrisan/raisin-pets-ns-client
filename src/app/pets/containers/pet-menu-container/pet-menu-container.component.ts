import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";

@Component({
  selector: "app-pet-menu-container",
  templateUrl: "./pet-menu-container.component.html",
  styleUrls: ["./pet-menu-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetMenuContainerComponent {
  petId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  onGoToTutorials(): void {
    this.routerExtensions
      .navigate([`pets/dashboard/tutorials/${this.petId}`])
      .then();
  }

  onGoToExerciseTracking(): void {
    this.routerExtensions
      .navigate([`pets/dashboard/exercises/${this.petId}`])
      .then();
  }
}
