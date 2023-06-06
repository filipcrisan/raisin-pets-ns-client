import { createSelector } from "@ngrx/store";
import { getFeatureState } from "./index";

export const getPetsState = createSelector(
  getFeatureState,
  (state) => state.pets
);

const getPets = createSelector(getPetsState, (state) => state.pets.entities);

const getPetsLoading = createSelector(
  getPetsState,
  (state) => state.pets.loading
);

const getPetsLoaded = createSelector(
  getPetsState,
  (state) => state.pets.loaded
);

const getPetsError = createSelector(getPetsState, (state) => state.pets.error);

const getPetsSaving = createSelector(
  getPetsState,
  (state) => state.pets.saving
);

const getTutorials = createSelector(
  getPetsState,
  (state) => state.tutorials.entities
);

const getTutorialsLoading = createSelector(
  getPetsState,
  (state) => state.tutorials.loading
);

const getTutorialsError = createSelector(
  getPetsState,
  (state) => state.tutorials.error
);

const getExercises = (petId: number) =>
  createSelector(getPetsState, (state) => state.exercises.get(petId)?.entities);

const getExercisesLoading = (petId: number) =>
  createSelector(getPetsState, (state) => state.exercises.get(petId)?.loading);

const getExercisesLoaded = (petId: number) =>
  createSelector(getPetsState, (state) => state.exercises.get(petId)?.loaded);

const getExercisesError = (petId: number) =>
  createSelector(getPetsState, (state) => state.exercises.get(petId)?.error);

const getExercisesSaving = (petId: number) =>
  createSelector(getPetsState, (state) => state.exercises.get(petId)?.saving);

const getReminders = createSelector(
  getPetsState,
  (state) => state.reminders.entities
);

const getRemindersLoading = createSelector(
  getPetsState,
  (state) => state.reminders.loading
);

const getRemindersLoaded = createSelector(
  getPetsState,
  (state) => state.reminders.loaded
);

const getRemindersError = createSelector(
  getPetsState,
  (state) => state.reminders.error
);

const getRemindersSaving = createSelector(
  getPetsState,
  (state) => state.reminders.saving
);

export const petsQuery = {
  getPets,
  getPetsLoading,
  getPetsLoaded,
  getPetsError,
  getPetsSaving,
  getTutorials,
  getTutorialsLoading,
  getTutorialsError,
  getExercises,
  getExercisesLoading,
  getExercisesLoaded,
  getExercisesError,
  getExercisesSaving,
  getReminders,
  getRemindersLoading,
  getRemindersLoaded,
  getRemindersError,
  getRemindersSaving,
};
