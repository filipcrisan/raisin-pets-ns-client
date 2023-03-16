import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
} from "@angular/core";
import { Location } from "@nativescript/geolocation";
import { GeolocationService } from "../../../shared/services/geolocation.service";

@Component({
  selector: "app-add-exercise-container",
  templateUrl: "./add-exercise-container.component.html",
  styleUrls: ["./add-exercise-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExerciseContainerComponent implements OnDestroy {
  watchId: number = null;
  locations: Location[] = [];

  constructor(private geolocationService: GeolocationService) {}

  @HostListener("unloaded")
  ngOnDestroy() {
    console.log("Items destroyed");
    this.stopWatchingLocation();
  }

  async onExerciseChanged(): Promise<void> {
    if (this.watchId) {
      this.stopWatchingLocation();
      // TODO: save the exercise session here
      return;
    }

    await this.startWatchingLocation();
  }

  private async startWatchingLocation(): Promise<void> {
    const canUseLocation = await this.geolocationService.canUseLocation();

    if (!canUseLocation) {
      this.geolocationService.requestPermission().then(
        () => {
          this.watchId = this.geolocationService.watchLocation((location) => {
            this.locations = [...this.locations, location];
          });
        },
        () => {}
      );

      return;
    }

    this.watchId = this.geolocationService.watchLocation((location) => {
      this.locations = [...this.locations, location];
    });
  }

  private stopWatchingLocation() {
    if (this.watchId) {
      this.geolocationService.clearWatch(this.watchId);
      this.watchId = null;
      console.log(this.geolocationService.getTotalDistance(this.locations));
    }
  }
}
