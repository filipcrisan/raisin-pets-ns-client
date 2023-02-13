import { createAction } from "@ngrx/store";

export const getAllPets = createAction("[Pets] Get all pets");

export const addPet = createAction("[Pets] Add pet");

export const editPet = createAction("[Pets] Edit pet");

export const deletePet = createAction("[Pets] Delete pet");
