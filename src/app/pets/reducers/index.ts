import * as fromPets from "./pets.reducer";
import { Action, combineReducers, createFeatureSelector } from "@ngrx/store";

export const featureKey = "pets";

export interface State {
  [fromPets.featureKey]: fromPets.State;
}

export function reducers(
  state: State | undefined,
  action: Action
): { pets: fromPets.State } {
  return combineReducers({
    [fromPets.featureKey]: fromPets.reducer,
  })(state, action);
}

export const getFeatureState = createFeatureSelector<State>(featureKey);
