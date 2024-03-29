import { Injectable } from "@angular/core";
import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core";
import Accuracy = CoreTypes.Accuracy;
import { Location, successCallbackType } from "@nativescript/geolocation";
import { Toasty } from "@triniwiz/nativescript-toasty";

@Injectable({
  providedIn: "root",
})
export class GeolocationService {
  requestPermission(): Promise<void> {
    return geolocation.enableLocationRequest(true, true);
  }

  canUseLocation(): Promise<boolean> {
    return geolocation.isEnabled();
  }

  watchLocation(successCallback: successCallbackType): number {
    return geolocation.watchLocation(
      successCallback,
      () => {
        new Toasty({
          text: "Error upon tracking your location. Please try again.",
        }).show();
      },
      {
        desiredAccuracy: Accuracy.high,
        updateDistance: 1,
        iosAllowsBackgroundLocationUpdates: true,
        iosPausesLocationUpdatesAutomatically: false,
      }
    );
  }

  clearWatch(watchId: number): void {
    geolocation.clearWatch(watchId);
  }

  getTotalDistance(locations: Location[]): number {
    if (locations.length < 2) {
      return 0;
    }

    locations = locations.sort(
      (a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()
    );

    let result = 0;
    for (let i = 0; i < locations.length - 1; i++) {
      result += geolocation.distance(locations[i + 1], locations[i]);
    }

    return result / 1000;
  }

  getAverageSpeed(locations: Location[]): number {
    if (locations.length < 2) {
      return 0;
    }

    let total = 0;
    locations.forEach((x) => (total += x.speed));

    let average = total / locations.length;
    average *= 3.6;
    return Math.max(0, average);
  }
}
