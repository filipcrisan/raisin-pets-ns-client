import {createFeatureSelector, createSelector} from "@ngrx/store";
import {featureKey as authFeatureKey, State as AuthState} from "./auth.reducer";

export const getAuthState = createFeatureSelector<AuthState>(authFeatureKey);

const getUser = createSelector(
  getAuthState,
  (state) => state.user
);

const getLoaded = createSelector(
  getAuthState,
  (state) => state.loaded
);

export const authQuery = {
  getUser,
  getLoaded
};
