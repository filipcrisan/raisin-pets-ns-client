import { Exercise } from './exercise.model';
import { HttpErrorResponse } from '@angular/common/http';

export type ExercisesOfPetStateType = {
  entities: Exercise[];
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  error: HttpErrorResponse;
};

export const defaultExercisesOfPetState: ExercisesOfPetStateType = {
  entities: [],
  loading: false,
  loaded: false,
  saving: false,
  error: null,
};
