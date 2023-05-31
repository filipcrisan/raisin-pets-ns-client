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
      width: 20,
    });

    this.map.animateCamera(CameraUpdate.fromCoordinate(this.vertices[0], 20));
  }
}
