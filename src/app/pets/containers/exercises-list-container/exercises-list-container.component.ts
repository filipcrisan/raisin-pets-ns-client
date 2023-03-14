import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GeolocationService } from "../../../shared/services/geolocation.service";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-exercises-list-container",
  templateUrl: "./exercises-list-container.component.html",
  styleUrls: ["./exercises-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesListContainerComponent {
  petId!: number;

  constructor(
    private geolocationService: GeolocationService,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  onAddExercise(): void {
    this.routerExtensions
      .navigate([`pets/dashboard/add-exercise/${this.petId}`])
      .then();
  }
}
