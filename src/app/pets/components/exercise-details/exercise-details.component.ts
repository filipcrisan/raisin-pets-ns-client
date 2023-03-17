import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Exercise } from "../../models/exercise.model";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-exercise-details",
  templateUrl: "./exercise-details.component.html",
  styleUrls: ["./exercise-details.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsComponent {
  @Input() exercise: Exercise;
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;
}
