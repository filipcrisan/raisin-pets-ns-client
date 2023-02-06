import * as fromPets from "./pets.reducer";
import { Action, combineReducers } from "@ngrx/store";

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
