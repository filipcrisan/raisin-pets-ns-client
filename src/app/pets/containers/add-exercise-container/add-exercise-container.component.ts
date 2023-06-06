import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { Location } from "@nativescript/geolocation";
import { GeolocationService } from "../../../shared/services/geolocation.service";
import { ExercisesFacades } from "../../facades/exercises.facades";
import { ActivatedRoute } from "@angular/router";
import { Checkpoint } from "../../models/checkpoint.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { tap } from "rxjs";
import { RouterExtensions } from "@nativescript/angular";

@UntilDestroy()
@Component({
  selector: "app-add-exercise-container",
  templateUrl: "./add-exercise-container.component.html",
  styleUrls: ["./add-exercise-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExerciseContainerComponent implements OnDestroy {
  exercisesQuery: any;

  petId!: number;
  watchId: number = null;
  locations: Location[] = [];

  constructor(
    private geolocationService: GeolocationService,
    private exercisesFacades: ExercisesFacades,
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
    this.exercisesQuery = this.exercisesFacades.query(this.petId).exercises;
  }

  @HostListener("unloaded")
  ngOnDestroy() {
    this.stopWatchingLocation();
  }

  async onExerciseChanged(): Promise<void> {
    if (this.watchId) {
      this.stopWatchingLocation();
      this.saveExercise();
      return;
    }

    await this.startWatchingLocation();
  }

  private async startWatchingLocation(): Promise<void> {
    const canUseLocation = await this.geolocationService.canUseLocation();

    if (!canUseLocation) {
      this.geolocationService.requestPermission().then(
        () => {
          this.watchLocation();
        },
        () => {}
      );

      return;
    }

    this.watchLocation();
  }

  private watchLocation(): void {
    this.watchId = this.geolocationService.watchLocation((location) => {
      this.locations = [...this.locations, location];
    });
  }

  private stopWatchingLocation() {
    if (this.watchId) {
      this.geolocationService.clearWatch(this.watchId);
      this.watchId = null;
    }
  }

  private saveExercise(): void {
    const checkpoints = this.locations.map((x) => {
      const checkpoint: Checkpoint = { ...x };
      return checkpoint;
    });

    const exercise = {
      petId: this.petId,
      totalDistance: this.geolocationService.getTotalDistance(this.locations),
      averageSpeed: this.geolocationService.getAverageSpeed(this.locations),
      checkpoints,
    };

    this.exercisesFacades
      .addExercise(exercise)
      .pipe(
        untilDestroyed(this),
        tap({
          next: () => {
            this.routerExtensions.backToPreviousPage();
          },
        })
      )
      .subscribe();
  }
}
