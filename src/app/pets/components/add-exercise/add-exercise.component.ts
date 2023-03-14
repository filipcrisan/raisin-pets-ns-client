import { ChangeDetectionStrategy, Component } from "@angular/core";
import { GeolocationService } from "../../../shared/services/geolocation.service";
import { Location } from "@nativescript/geolocation";

@Component({
  selector: "app-add-exercise",
  templateUrl: "./add-exercise.component.html",
  styleUrls: ["./add-exercise.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExerciseComponent {
  watchId: number = null;
  locations: Location[] = [];

  constructor(private geolocationService: GeolocationService) {}

  async onTap(): Promise<void> {
    if (this.watchId) {
      this.stopWatchingLocation();
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
