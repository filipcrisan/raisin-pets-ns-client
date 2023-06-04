import { createReducer, on } from "@ngrx/store";
import { AuthActions } from "../actions";
import { User } from "../models/user.model";
import { HttpErrorResponse } from "@angular/common/http";

export const featureKey = "auth";

export interface State {
  user: User;
  loading: boolean;
  error: HttpErrorResponse;
}

export const initialState: State = {
  user: null,
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.clearState, () => initialState),
  on(AuthActions.loadUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(AuthActions.loadUserSuccess, (state, { user }) => ({
    ...state,
    user: user,
    loading: false,
    error: null,
  })),
  on(AuthActions.loadUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
