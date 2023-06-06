import { createReducer, on } from "@ngrx/store";
import { Pet } from "../models/pet.model";
import { PetsApiActions, PetsPageActions } from "../actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Tutorial } from "../models/tutorial.model";
import { Reminder } from "../models/reminder.model";
import {
  defaultExercisesOfPetState,
  ExercisesOfPetStateType,
} from "../models/exercises-of-pet-state-type.model";

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
  exercises: Map<number, ExercisesOfPetStateType>;
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
  exercises: new Map<number, ExercisesOfPetStateType>(),
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
  on(PetsApiActions.getAllPetsSuccess, (state, { pets }) => {
    pets.forEach((pet) => {
      state.exercises.set(pet.id, { ...defaultExercisesOfPetState });
    });

    return {
      ...state,
      pets: {
        ...state.pets,
        entities: pets,
        loading: false,
        loaded: true,
        error: null,
      },
    };
  }),
  on(PetsApiActions.getAllPetsFailure, (state, { error }) => ({
    ...state,
    pets: {
      ...state.pets,
      loading: false,
      loaded: false,
      error: error,
    },
    exercises: new Map<number, ExercisesOfPetStateType>(),
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
    // TODO: check if pet details should be erased here
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
  on(PetsPageActions.getAllExercises, (state, { petId }) => {
    let exercisesOfPet = getExercisesOfPetOrDefault(state.exercises, petId);

    exercisesOfPet = {
      ...exercisesOfPet,
      loading: true,
      error: null,
    };

    state.exercises.set(petId, exercisesOfPet);

    return { ...state };
  }),
  on(PetsApiActions.getAllExercisesSuccess, (state, { petId, exercises }) => {
    let exercisesOfPet = getExercisesOfPetOrDefault(state.exercises, petId);

    exercisesOfPet = {
      ...exercisesOfPet,
      entities: exercises,
      loading: false,
      loaded: true,
      error: null,
    };

    state.exercises.set(petId, exercisesOfPet);

    return { ...state };
  }),
  on(PetsApiActions.getAllExercisesFailure, (state, { petId, error }) => {
    let exercisesOfPet = getExercisesOfPetOrDefault(state.exercises, petId);

    exercisesOfPet = {
      ...exercisesOfPet,
      loading: false,
      loaded: false,
      error: error,
    };

    state.exercises.set(petId, exercisesOfPet);

    return { ...state };
  }),
  on(
    PetsPageActions.addExercise,
    PetsPageActions.deleteExercise,
    (state, { petId }) => {
      let exercisesOfPet = getExercisesOfPetOrDefault(state.exercises, petId);

      exercisesOfPet = {
        ...exercisesOfPet,
        saving: true,
        error: null,
      };

      state.exercises.set(petId, exercisesOfPet);

      return { ...state };
    }
  ),
  on(PetsApiActions.addExerciseSuccess, (state, { exercise }) => {
    let exercisesOfPet = getExercisesOfPetOrDefault(
      state.exercises,
      exercise.petId
    );

    exercisesOfPet = {
      ...exercisesOfPet,
      entities: [...exercisesOfPet.entities, exercise],
      saving: false,
      error: null,
    };

    state.exercises.set(exercise.petId, exercisesOfPet);

    return { ...state };
  }),
  on(PetsApiActions.addExerciseFailure, (state, { petId, error }) => {
    let exercisesOfPet = getExercisesOfPetOrDefault(state.exercises, petId);

    exercisesOfPet = {
      ...exercisesOfPet,
      saving: false,
      error: error,
    };

    state.exercises.set(petId, exercisesOfPet);

    return { ...state };
  }),
  on(PetsApiActions.deleteExerciseSuccess, (state, { exercise }) => {
    let exercisesOfPet = getExercisesOfPetOrDefault(
      state.exercises,
      exercise.petId
    );

    exercisesOfPet = {
      ...exercisesOfPet,
      entities: exercisesOfPet.entities.filter((x) => x.id !== exercise.id),
      saving: false,
      error: null,
    };

    state.exercises.set(exercise.petId, exercisesOfPet);

    return { ...state };
  }),
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

function getExercisesOfPetOrDefault(
  exercises: Map<number, ExercisesOfPetStateType>,
  petId: number
): ExercisesOfPetStateType {
  let petExercises = exercises.get(petId);

  if (!petExercises) {
    petExercises = { ...defaultExercisesOfPetState };
  }

  return petExercises;
}
