import {
  AfterViewInit,
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
import { Dialogs } from "@nativescript/core";
import { distinctUntilChanged, filter, switchMap, tap } from "rxjs";

@UntilDestroy()
@Component({
  selector: "app-exercises-list-container",
  templateUrl: "./exercises-list-container.component.html",
  styleUrls: ["./exercises-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesListContainerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  exercisesQuery: any;

  petId!: number;

  constructor(
    private geolocationService: GeolocationService,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private exercisesFacades: ExercisesFacades
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
    this.exercisesQuery = this.exercisesFacades.query(this.petId).exercises;
  }

  ngAfterViewInit(): void {
    console.log("Exercises list: ", Date.now());
  }

  ngOnInit(): void {
    this.exercisesQuery.loaded$
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        filter((loaded) => !loaded),
        switchMap(() => this.exercisesFacades.getAllExercises(this.petId))
      )
      .subscribe();
  }

  @HostListener("unloaded")
  ngOnDestroy() {
    // we need this in order to destroy the subscription from ngOnInit
  }

  onRefreshList(): void {
    this.exercisesFacades
      .getAllExercises(this.petId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  onAddExercise(): void {
    this.routerExtensions
      .navigate([`pets/dashboard/add-exercise/${this.petId}`])
      .then();
  }

  onDelete(exerciseId: number): void {
    Dialogs.action({
      message: "Are you sure you want to delete this exercise?",
      cancelButtonText: "Cancel",
      actions: ["Delete"],
    }).then(async (result) => {
      if (result === "Delete") {
        this.exercisesFacades
          .deleteExercise(this.petId, exerciseId)
          .pipe(untilDestroyed(this))
          .subscribe();
      }
    });
  }

  onSelectExercise(id: number): void {
    this.routerExtensions
      .navigate([`pets/dashboard/pet/${this.petId}/exercise/${id}/details`])
      .then();
  }
}
