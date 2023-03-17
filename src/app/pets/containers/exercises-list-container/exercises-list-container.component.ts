import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { GeolocationService } from "../../../shared/services/geolocation.service";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { ExercisesFacades } from "../../facades/exercises.facades";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-exercises-list-container",
  templateUrl: "./exercises-list-container.component.html",
  styleUrls: ["./exercises-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesListContainerComponent implements OnInit, OnDestroy {
  exercisesQuery = this.exercisesFacades.query.exercises;

  petId!: number;

  constructor(
    private geolocationService: GeolocationService,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private exercisesFacades: ExercisesFacades
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.exercisesFacades
      .getAllExercises(this.petId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  @HostListener("unloaded")
  ngOnDestroy(): void {
    this.exercisesFacades.clearExercises();
  }

  onAddExercise(): void {
    this.routerExtensions
      .navigate([`pets/dashboard/add-exercise/${this.petId}`])
      .then();
  }

  onSelectExercise(id: number): void {
    console.log("selected ", id);
  }
}
