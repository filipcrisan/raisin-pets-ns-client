import { createReducer, on } from "@ngrx/store";
import { Pet } from "../models/pet.model";
import { PetsApiActions, PetsPageActions } from "../actions";
import { HttpErrorResponse } from "@angular/common/http";
import { Tutorial } from "../models/tutorial.model";
import {
  defaultExercisesOfPetState,
  ExercisesOfPetStateType,
} from "../models/exercises-of-pet-state-type.model";
import {
  defaultRemindersOfPetState,
  RemindersOfPetStateType,
} from "../models/reminders-of-pet-state-type.model";

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
  reminders: Map<number, RemindersOfPetStateType>;
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
  reminders: new Map<number, RemindersOfPetStateType>(),
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
      state.reminders.set(pet.id, { ...defaultRemindersOfPetState });
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
    reminders: new Map<number, RemindersOfPetStateType>(),
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
  on(PetsPageActions.getAllReminders, (state, { petId }) => {
    let remindersOfPet = getRemindersOfPetOrDefault(state.reminders, petId);

    remindersOfPet = {
      ...remindersOfPet,
      loading: true,
      error: null,
    };

    state.reminders.set(petId, remindersOfPet);

    return { ...state };
  }),
  on(PetsApiActions.getAllRemindersSuccess, (state, { petId, reminders }) => {
    let remindersOfPet = getRemindersOfPetOrDefault(state.reminders, petId);

    remindersOfPet = {
      ...remindersOfPet,
      entities: reminders,
      loading: false,
      loaded: true,
      error: null,
    };

    state.reminders.set(petId, remindersOfPet);

    return { ...state };
  }),
  on(PetsApiActions.getAllRemindersFailure, (state, { petId, error }) => {
    let remindersOfPet = getRemindersOfPetOrDefault(state.reminders, petId);

    remindersOfPet = {
      ...remindersOfPet,
      loading: false,
      loaded: false,
      error: error,
    };

    state.reminders.set(petId, remindersOfPet);

    return { ...state };
  }),
  on(
    PetsPageActions.addReminder,
    PetsPageActions.deleteReminder,
    (state, { petId }) => {
      let remindersOfPet = getRemindersOfPetOrDefault(state.reminders, petId);

      remindersOfPet = {
        ...remindersOfPet,
        saving: true,
        error: null,
      };

      state.reminders.set(petId, remindersOfPet);

      return { ...state };
    }
  ),
  on(PetsApiActions.addReminderSuccess, (state, { reminder }) => {
    let remindersOfPet = getRemindersOfPetOrDefault(
      state.reminders,
      reminder.petId
    );

    remindersOfPet = {
      ...remindersOfPet,
      entities: [...remindersOfPet.entities, reminder],
      saving: false,
      error: null,
    };

    state.reminders.set(reminder.petId, remindersOfPet);

    return { ...state };
  }),
  on(PetsApiActions.addReminderFailure, (state, { petId, error }) => {
    let remindersOfPet = getRemindersOfPetOrDefault(state.reminders, petId);

    remindersOfPet = {
      ...remindersOfPet,
      saving: false,
    };

    state.reminders.set(petId, remindersOfPet);

    return { ...state };
  }),
  on(PetsApiActions.deleteReminderSuccess, (state, { reminder }) => {
    let remindersOfPet = getRemindersOfPetOrDefault(
      state.reminders,
      reminder.petId
    );

    remindersOfPet = {
      ...remindersOfPet,
      entities: remindersOfPet.entities.filter((x) => x.id !== reminder.id),
      saving: false,
      error: null,
    };

    state.reminders.set(reminder.petId, remindersOfPet);

    return { ...state };
  })
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

function getRemindersOfPetOrDefault(
  reminders: Map<number, RemindersOfPetStateType>,
  petId: number
): RemindersOfPetStateType {
  let petReminders = reminders.get(petId);

  if (!petReminders) {
    petReminders = { ...defaultRemindersOfPetState };
  }

  return petReminders;
}
