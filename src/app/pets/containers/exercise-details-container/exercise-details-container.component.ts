import { ChangeDetectionStrategy, Component } from "@angular/core";
import { map } from "rxjs";
import { ExercisesFacades } from "../../facades/exercises.facades";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-exercise-details-container",
  templateUrl: "./exercise-details-container.component.html",
  styleUrls: ["./exercise-details-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseDetailsContainerComponent {
  exercisesQuery = this.exercisesFacades.query.exercises;

  exerciseId!: number;
  exercise$ = this.exercisesQuery.entities$.pipe(
    map((x) => x.find((y) => y.id === this.exerciseId))
  );

  constructor(
    private exercisesFacades: ExercisesFacades,
    private activatedRoute: ActivatedRoute
  ) {
    this.exerciseId = +this.activatedRoute.snapshot.params["id"];
  }
}
