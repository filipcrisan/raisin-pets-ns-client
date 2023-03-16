import { createReducer, on } from "@ngrx/store";
import { Pet } from "../models/pet.model";
import { PetsApiActions, PetsPageActions } from "../actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Tutorial } from "../models/tutorial.model";
import { Exercise } from "../models/exercise.model";

export const featureKey = "pets";

export interface State {
  pets: {
    entities: Pet[];
    loading: boolean;
    saving: boolean;
    error: HttpErrorResponse;
  };
  tutorials: {
    entities: Tutorial[];
    loading: boolean;
    error: HttpErrorResponse;
  };
  exercises: {
    entities: Exercise[];
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
  tutorials: {
    entities: [],
    loading: false,
    error: null,
  },
  exercises: {
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
  on(
    PetsPageActions.addPet,
    PetsPageActions.editPet,
    PetsPageActions.deletePet,
    (state) => ({
      ...state,
      pets: {
        ...state.pets,
        saving: true,
        error: null,
      },
    })
  ),
  on(PetsApiActions.addPetSuccess, (state, { pet }) => ({
    ...state,
    pets: {
      ...state.pets,
      entities: [...state.pets.entities, pet],
      saving: false,
      error: null,
    },
  })),
  on(
    PetsApiActions.addPetFailure,
    PetsApiActions.editPetFailure,
    (state, { error }) => ({
      ...state,
      pets: {
        ...state.pets,
        saving: false,
        error: error,
      },
    })
  ),
  on(PetsApiActions.editPetSuccess, (state, { pet }) => ({
    ...state,
    pets: {
      ...state.pets,
      entities: state.pets.entities.map((x) => (x.id === pet.id ? pet : x)),
      saving: false,
      error: null,
    },
  })),
  on(PetsApiActions.deletePetSuccess, (state, { pet }) => ({
    ...state,
    pets: {
      ...state.pets,
      entities: state.pets.entities.filter((x) => x.id !== pet.id),
      saving: false,
      error: null,
    },
  })),
  on(PetsPageActions.getTutorialsByCategory, (state) => ({
    ...state,
    tutorials: {
      ...state.tutorials,
      loading: true,
      error: null,
    },
  })),
  on(PetsPageActions.clearTutorials, (state) => ({
    ...state,
    tutorials: initialState.tutorials,
  })),
  on(PetsApiActions.getTutorialsByCategorySuccess, (state, { tutorials }) => ({
    ...state,
    tutorials: {
      ...state.tutorials,
      entities: tutorials,
      loading: false,
      error: null,
    },
  })),
  on(PetsApiActions.getAllPetsFailure, (state, { error }) => ({
    ...state,
    tutorials: {
      ...state.tutorials,
      loading: false,
      error: error,
    },
  })),
  on(PetsPageActions.getAllExercises, (state) => ({
    ...state,
    exercises: {
      ...state.exercises,
      loading: true,
      error: null,
    },
  })),
  on(PetsApiActions.getAllExercisesSuccess, (state, { exercises }) => ({
    ...state,
    exercises: {
      ...state.exercises,
      entities: exercises,
      loading: false,
      error: null,
    },
  })),
  on(PetsApiActions.getAllExercisesFailure, (state, { error }) => ({
    ...state,
    exercises: {
      ...state.exercises,
      loading: false,
      error: error,
    },
  })),
  on(PetsPageActions.addExercise, (state) => ({
    ...state,
    exercises: {
      ...state.exercises,
      saving: true,
      error: null,
    },
  })),
  on(PetsApiActions.addExerciseSuccess, (state, { exercise }) => ({
    ...state,
    exercises: {
      ...state.exercises,
      entities: [...state.exercises.entities, exercise],
      saving: false,
      error: null,
    },
  })),
  on(PetsApiActions.addExerciseFailure, (state, { error }) => ({
    ...state,
    exercises: {
      ...state.exercises,
      saving: false,
      error: error,
    },
  })),
  on(PetsPageActions.clearExercises, (state) => ({
    ...state,
    exercises: initialState.exercises,
  }))
);
