import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from "@angular/core";
import { Exercise } from "../../models/exercise.model";
import { HttpErrorResponse } from "@angular/common/http";
import {
  CameraUpdate,
  Coordinate,
  GoogleMap,
  MapReadyEvent,
} from "@nativescript/google-maps";
import { NgChanges } from "~/app/shared/models/simple-changes-typed";

@Component({
  selector: "app-exercise-details",
  templateUrl: "./exercise-details.component.html",
  styleUrls: ["./exercise-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsComponent implements OnChanges {
  @Input() exercise: Exercise;
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  vertices: Coordinate[] = [];
  map: GoogleMap;
  mapDimensions = {
    width: 350,
    height: 350,
  };

  ngOnChanges(changes: NgChanges<ExerciseDetailsComponent>): void {
    if (changes.exercise?.currentValue) {
      const checkpoints = ([...this.exercise.checkpoints] ?? []).sort(
        (a, b) => a.timestamp.valueOf() - b.timestamp.valueOf()
      );

      this.vertices = checkpoints.map((x) => ({
        lat: x.latitude,
        lng: x.longitude,
      }));

      this.updatePolyline();
    }
  }

  onMapReady(event: MapReadyEvent): void {
    this.map = event.map;
    this.updatePolyline();
  }

  private updatePolyline(): void {
    if (!this.map) {
      return;
    }

    this.map.addPolyline({
      points: this.vertices,
      tappable: false,
      visible: true,
      color: "#32a1d0",
      width: 10,
    });

    const bounds = this.getBounds();
    const zoom = this.getZoomLevel(bounds);
    const center = this.getCenter(bounds.ne, bounds.sw);

    this.map.animateCamera(CameraUpdate.fromCoordinate(center, zoom));
  }

  private getBounds(): { ne: Coordinate; sw: Coordinate } {
    const ne: Coordinate = {
      lat: Math.max(...this.vertices.map((x) => x.lat)),
      lng: Math.max(...this.vertices.map((x) => x.lng)),
    };
    const sw: Coordinate = {
      lat: Math.min(...this.vertices.map((x) => x.lat)),
      lng: Math.min(...this.vertices.map((x) => x.lng)),
    };
    return { ne, sw };
  }

  private getCenter(ne: Coordinate, sw: Coordinate): Coordinate {
    return { lat: (ne.lat + sw.lat) / 2, lng: (ne.lng + sw.lng) / 2 };
  }

  private getZoomLevel(bounds: { ne: Coordinate; sw: Coordinate }): number {
    const WORLD_DIM = { height: 256, width: 256 };
    const ZOOM_MAX = 21;

    function latRad(lat: number) {
      const sin = Math.sin((lat * Math.PI) / 180);
      const radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx: number, worldPx: number, fraction: number) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }

    const ne = bounds.ne;
    const sw = bounds.sw;

    const latFraction = (latRad(ne.lat) - latRad(sw.lat)) / Math.PI;

    const lngDiff = ne.lng - sw.lng;
    const lngFraction = (lngDiff < 0 ? lngDiff + 360 : lngDiff) / 360;

    const latZoom = zoom(
      this.mapDimensions.height,
      WORLD_DIM.height,
      latFraction
    );
    const lngZoom = zoom(
      this.mapDimensions.width,
      WORLD_DIM.width,
      lngFraction
    );

    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }
}
