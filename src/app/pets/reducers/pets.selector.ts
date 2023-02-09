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

export const petsQuery = {
  getPets,
  getPetsLoading,
  getPetsError,
  getPetsSaving,
};
