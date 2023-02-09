import { createReducer, on } from "@ngrx/store";
import { Pet } from "../models/pet.model";
import { PetsApiActions, PetsPageActions } from "../actions";
import { HttpErrorResponse } from "@angular/common/http";

export const featureKey = "pets";

export interface State {
  pets: {
    entities: Pet[];
    loading: boolean;
    saving: boolean;
    error: HttpErrorResponse;
  };
}

export const initialState: State = {
  pets: {
    entities: [],
    loading: false,
    saving: false,
    error: null,
  },
};

export const reducer = createReducer(
  initialState,
  on(PetsPageActions.getAllPets, (state) => ({
    ...state,
    pets: {
      ...state.pets,
      loading: true,
      error: null,
    },
  })),
  on(PetsApiActions.getAllPetsSuccess, (state, { pets }) => ({
    ...state,
    pets: {
      ...state.pets,
      entities: pets,
      loading: false,
      error: null,
    },
  })),
  on(PetsApiActions.getAllPetsFailure, (state, { error }) => ({
    ...state,
    pets: {
      ...state.pets,
      loading: false,
      error: error,
    },
  })),
  on(PetsPageActions.addPet, (state) => ({
    ...state,
    pets: {
      ...state.pets,
      saving: true,
      error: null,
    },
  })),
  on(PetsApiActions.addPetSuccess, (state, { pet }) => ({
    ...state,
    pets: {
      ...state.pets,
      entities: [...state.pets.entities, pet],
      saving: false,
      error: null,
    },
  })),
  on(PetsApiActions.addPetFailure, (state, { error }) => ({
    ...state,
    pets: {
      ...state.pets,
      saving: false,
      error: error,
    },
  }))
);
