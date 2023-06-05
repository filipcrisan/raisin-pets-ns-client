import { createReducer, on } from "@ngrx/store";
import { Pet } from "../models/pet.model";
import { PetsApiActions, PetsPageActions } from "../actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Tutorial } from "../models/tutorial.model";
import { Exercise } from "../models/exercise.model";
import { Reminder } from "../models/reminder.model";

export const featureKey = "pets";

export interface State {
  pets: {
    entities: Pet[];
    loading: boolean;
    loaded: boolean;
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
    loaded: boolean;
    saving: boolean;
    error: HttpErrorResponse;
  };
  reminders: {
    entities: Reminder[];
    loading: boolean;
    loaded: boolean;
    saving: boolean;
    error: HttpErrorResponse;
  };
}

export const initialState: State = {
  pets: {
    entities: [],
    loading: false,
    loaded: false,
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
    loaded: false,
    saving: false,
    error: null,
  },
  reminders: {
    entities: [],
    loading: false,
    loaded: false,
    saving: false,
    error: null,
  },
};

export const reducer = createReducer(
  initialState,
  on(PetsPageActions.clearState, () => initialState),
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
      loaded: true,
      error: null,
    },
  })),
  on(PetsApiActions.getAllPetsFailure, (state, { error }) => ({
    ...state,
    pets: {
      ...state.pets,
      loading: false,
      loaded: false,
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
  on(PetsApiActions.getTutorialsByCategoryFailure, (state, { error }) => ({
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
      loaded: true,
      error: null,
    },
  })),
  on(PetsApiActions.getAllExercisesFailure, (state, { error }) => ({
    ...state,
    exercises: {
      ...state.exercises,
      loading: false,
      loaded: false,
      error: error,
    },
  })),
  on(PetsPageActions.addExercise, PetsPageActions.deleteExercise, (state) => ({
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
  on(PetsApiActions.deleteExerciseSuccess, (state, { exercise }) => ({
    ...state,
    exercises: {
      ...state.exercises,
      entities: state.exercises.entities.filter((x) => x.id !== exercise.id),
      saving: false,
      error: null,
    },
  })),
  on(PetsPageActions.clearExercises, (state) => ({
    ...state,
    exercises: initialState.exercises,
  })),
  on(PetsPageActions.getAllReminders, (state) => ({
    ...state,
    reminders: {
      ...state.reminders,
      loading: true,
      error: null,
    },
  })),
  on(PetsApiActions.getAllRemindersSuccess, (state, { reminders }) => ({
    ...state,
    reminders: {
      ...state.reminders,
      entities: reminders,
      loading: false,
      loaded: true,
      error: null,
    },
  })),
  on(PetsApiActions.getAllRemindersFailure, (state, { error }) => ({
    ...state,
    reminders: {
      ...state.reminders,
      loading: false,
      loaded: false,
      error: error,
    },
  })),
  on(PetsPageActions.addReminder, PetsPageActions.deleteReminder, (state) => ({
    ...state,
    reminders: {
      ...state.reminders,
      saving: true,
      error: null,
    },
  })),
  on(PetsApiActions.addReminderSuccess, (state, { reminder }) => ({
    ...state,
    reminders: {
      ...state.reminders,
      entities: [...state.reminders.entities, reminder],
      saving: false,
      error: null,
    },
  })),
  on(PetsApiActions.addReminderFailure, (state, { error }) => ({
    ...state,
    reminders: {
      ...state.reminders,
      saving: false,
      error: error,
    },
  })),
  on(PetsApiActions.deleteReminderSuccess, (state, { reminder }) => ({
    ...state,
    reminders: {
      ...state.reminders,
      entities: state.reminders.entities.filter((x) => x.id !== reminder.id),
      saving: false,
      error: null,
    },
  })),
  on(PetsPageActions.clearReminders, (state) => ({
    ...state,
    reminders: initialState.reminders,
  }))
);
