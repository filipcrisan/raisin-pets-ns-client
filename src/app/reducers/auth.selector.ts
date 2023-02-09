import { createFeatureSelector, createSelector } from "@ngrx/store";
import {
  featureKey as authFeatureKey,
  State as AuthState,
} from "./auth.reducer";

export const getAuthState = createFeatureSelector<AuthState>(authFeatureKey);

const getUser = createSelector(getAuthState, (state) => state.user);

const getUserLoading = createSelector(getAuthState, (state) => state.loading);

const getUserError = createSelector(getAuthState, (state) => state.error);

export const authQuery = {
  getUser,
  getUserLoading,
  getUserError,
};
