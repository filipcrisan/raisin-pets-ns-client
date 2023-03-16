import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { PetsApiActions, PetsPageActions } from "../actions";
import { petsQuery } from "../reducers/pets.selector";
import { ExercisesService } from "../services/exercises.service";
import { Exercise } from "../models/exercise.model";

@Injectable()
export class ExercisesFacades {
  query = {
    exercises: {
      entities$: this.store.select(petsQuery.getExercises),
      loading$: this.store.select(petsQuery.getExercisesLoading),
      error$: this.store.select(petsQuery.getExercisesError),
      saving$: this.store.select(petsQuery.getExercisesSaving),
    },
  };

  constructor(
    private store: Store,
    private exercisesService: ExercisesService
  ) {}

  getAllExercises(petId: number): Observable<Exercise[]> {
    this.store.dispatch(PetsPageActions.getAllExercises());

    return this.exercisesService.getAllExercises(petId).pipe(
      tap({
        next: (exercises) => {
          this.store.dispatch(
            PetsApiActions.getAllExercisesSuccess({ exercises })
          );
        },
        error: (error: HttpErrorResponse) => {
          // TODO: add toast notification service

          this.store.dispatch(PetsApiActions.getAllExercisesFailure({ error }));
        },
      })
    );
  }

  addExercise(exercise: Exercise): Observable<Exercise> {
    this.store.dispatch(PetsPageActions.addExercise());

    return this.exercisesService.addExercise(exercise).pipe(
      tap({
        next: (exercise) => {
          this.store.dispatch(PetsApiActions.addExerciseSuccess({ exercise }));
        },
        error: (error: HttpErrorResponse) => {
          // TODO: add toast notification service

          this.store.dispatch(PetsApiActions.addExerciseFailure({ error }));
        },
      })
    );
  }

  clearExercises(): void {
    this.store.dispatch(PetsPageActions.clearExercises());
  }
}
