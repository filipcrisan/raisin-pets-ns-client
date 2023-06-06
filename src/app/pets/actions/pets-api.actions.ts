import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { Pet } from "../models/pet.model";
import { Tutorial } from "../models/tutorial.model";
import { Exercise } from "../models/exercise.model";
import { Reminder } from "../models/reminder.model";

export const getAllPetsSuccess = createAction(
  "[Pets/API] Get all pets Success",
  props<{ pets: Pet[] }>()
);

export const getAllPetsFailure = createAction(
  "[Pets/API] Get all pets Failure",
  props<{ error: HttpErrorResponse }>()
);

export const addPetSuccess = createAction(
  "[Pets/API] Add pet Success",
  props<{ pet: Pet }>()
);

export const addPetFailure = createAction(
  "[Pets/API] Add pet Failure",
  props<{ error: HttpErrorResponse }>()
);

export const editPetSuccess = createAction(
  "[Pets/API] Edit pet Success",
  props<{ pet: Pet }>()
);

export const editPetFailure = createAction(
  "[Pets/API] Edit pet Failure",
  props<{ error: HttpErrorResponse }>()
);

export const deletePetSuccess = createAction(
  "[Pets/API] Delete pet Success",
  props<{ pet: Pet }>()
);

export const getTutorialsByCategorySuccess = createAction(
  "[Pets/API] Get tutorials by category Success",
  props<{ tutorials: Tutorial[] }>()
);

export const getTutorialsByCategoryFailure = createAction(
  "[Pets/API] Get tutorials by category Failure",
  props<{ error: HttpErrorResponse }>()
);

export const getAllExercisesSuccess = createAction(
  "[Pets/API] Get all exercises Success",
  props<{ petId: number; exercises: Exercise[] }>()
);

export const getAllExercisesFailure = createAction(
  "[Pets/API] Get all exercises Failure",
  props<{ petId: number; error: HttpErrorResponse }>()
);

export const addExerciseSuccess = createAction(
  "[Pets/API] Add exercise Success",
  props<{ exercise: Exercise }>()
);

export const addExerciseFailure = createAction(
  "[Pets/API] Add exercise Failure",
  props<{ petId: number; error: HttpErrorResponse }>()
);

export const deleteExerciseSuccess = createAction(
  "[Pets/API] Delete exercise Success",
  props<{ exercise: Exercise }>()
);

export const getAllRemindersSuccess = createAction(
  "[Pets/API] Get all reminders Success",
  props<{ petId: number; reminders: Reminder[] }>()
);

export const getAllRemindersFailure = createAction(
  "[Pets/API] Get all reminders Failure",
  props<{ petId: number; error: HttpErrorResponse }>()
);

export const addReminderSuccess = createAction(
  "[Pets/API] Add reminder Success",
  props<{ reminder: Reminder }>()
);

export const addReminderFailure = createAction(
  "[Pets/API] Add reminder Failure",
  props<{ petId: number; error: HttpErrorResponse }>()
);

export const deleteReminderSuccess = createAction(
  "[Pets/API] Delete reminder Success",
  props<{ reminder: Reminder }>()
);
