import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
  selector: "app-add-exercise-container",
  templateUrl: "./add-exercise-container.component.html",
  styleUrls: ["./add-exercise-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddExerciseContainerComponent {}
