import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { User } from "../models/user.model";

export const clearState = createAction("[Auth] Clear state");

export const loadUser = createAction("[Auth] Load user");

export const loadUserSuccess = createAction(
  "[Auth] Load user Success",
  props<{ user: User }>()
);

export const loadUserFailure = createAction(
  "[Auth] Load user Failure",
  props<{ error: HttpErrorResponse }>()
);
