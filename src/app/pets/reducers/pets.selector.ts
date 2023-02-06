import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  featureKey as petsFeatureKey,
  State as PetsState,
} from "./pets.reducer";

export const getPetsState = createFeatureSelector<PetsState>(petsFeatureKey);

const getPets = createSelector(getPetsState, (state) => state.pets.entities);

const getPetsLoading = createSelector(
  getPetsState,
  (state) => state.pets.loading
);

const getPetsError = createSelector(getPetsState, (state) => state.pets.error);

export const petsQuery = {
  getPets,
  getPetsLoading,
  getPetsError,
};
