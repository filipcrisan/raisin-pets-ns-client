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

export const petsQuery = {
  getPets,
  getPetsLoading,
  getPetsError,
  getPetsSaving,
  getTutorials,
  getTutorialsLoading,
  getTutorialsError,
  getExercises,
  getExercisesLoading,
  getExercisesError,
  getExercisesSaving,
};
