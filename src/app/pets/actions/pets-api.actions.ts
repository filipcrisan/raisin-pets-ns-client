import { createAction, props } from "@ngrx/store";
import { HttpErrorResponse } from "@angular/common/http";
import { Pet } from "../models/pet.model";

export const getAllPetsSuccess = createAction(
  "[Pets/API] Get all pets Success",
  props<{ pets: Pet[] }>()
);

export const getAllPetsFailure = createAction(
  "[Pets/API] Get all pets Failure",
  props<{ error: HttpErrorResponse }>()
);
