import { createAction, props } from "@ngrx/store";

export const clearState = createAction("[Pets] Clear state");

export const getAllPets = createAction("[Pets] Get all pets");

export const addPet = createAction("[Pets] Add pet");

export const editPet = createAction("[Pets] Edit pet");

export const deletePet = createAction("[Pets] Delete pet");

export const getTutorialsByCategory = createAction(
  "[Pets] Get tutorials by category"
);

export const clearTutorials = createAction("[Pets] Clear tutorials");

export const getAllExercises = createAction(
  "[Pets] Get all exercises",
  props<{ petId: number }>()
);

export const addExercise = createAction(
  "[Pets] Add exercise",
  props<{ petId: number }>()
);

export const deleteExercise = createAction(
  "[Pets] Delete exercise",
  props<{ petId: number }>()
);

export const clearExercises = createAction("[Pets] Clear exercises");

export const getAllReminders = createAction("[Pets] Get all reminders");

export const addReminder = createAction("[Pets] Add reminder");

export const deleteReminder = createAction("[Pets] Delete reminder");

export const clearReminders = createAction("[Pets] Clear reminders");
