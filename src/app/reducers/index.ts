import {InjectionToken} from "@angular/core";
import {ActionReducerMap, MetaReducer} from "@ngrx/store";
import * as fromAuth from './auth.reducer';
import {environment} from "~/environments/environment";
import {storeFreeze} from "ngrx-store-freeze";

export interface State {
  [fromAuth.featureKey]: fromAuth.State
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<State>>(
  'Root reducers token', {
    factory: (): ActionReducerMap<State> => ({
      [fromAuth.featureKey]: fromAuth.reducer
    })
  }
);

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
