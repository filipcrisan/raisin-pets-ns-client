import {createReducer, on} from "@ngrx/store";
import {AuthActions} from "../actions";
import {User} from "../models/user.model";

export const featureKey = 'auth';

export interface State {
  user: User;
  loaded: boolean;
}

export const initialState: State = {
  user: null,
  loaded: false
}

export const reducer = createReducer(
  initialState,
  on(AuthActions.loadUserSuccess, (state, {user}) => ({
    ...state,
    user: user,
    loaded: true
  })),
  on(AuthActions.loadUserFailure, (state, {error}) => ({
    ...state,
    loaded: false,
    error
  }))
);
