import { Injectable } from "@angular/core";
import * as geolocation from "@nativescript/geolocation";
import { CoreTypes } from "@nativescript/core";
import Accuracy = CoreTypes.Accuracy;
import { Location, successCallbackType } from "@nativescript/geolocation";

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
      (error) => {
        console.log(error);
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

    return result;
  }
}
