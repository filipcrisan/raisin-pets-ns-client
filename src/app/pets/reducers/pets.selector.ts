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

const getExercises = createSelector(
  getPetsState,
  (state) => state.exercises.entities
);

const getExercisesLoading = createSelector(
  getPetsState,
  (state) => state.exercises.loading
);

const getExercisesError = createSelector(
  getPetsState,
  (state) => state.exercises.error
);

const getExercisesSaving = createSelector(
  getPetsState,
  (state) => state.exercises.saving
);

const getReminders = createSelector(
  getPetsState,
  (state) => state.reminders.entities
);

const getRemindersLoading = createSelector(
  getPetsState,
  (state) => state.reminders.loading
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
  getExercisesError,
  getExercisesSaving,
  getReminders,
  getRemindersLoading,
  getRemindersError,
  getRemindersSaving,
};
