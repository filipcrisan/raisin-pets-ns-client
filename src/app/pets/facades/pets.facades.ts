import { Injectable } from "@angular/core";
import { PetsService } from "../services/pets.service";
import { Observable, tap } from "rxjs";
import { Pet } from "../models/pet.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { PetsApiActions, PetsPageActions } from "../actions";
import { petsQuery } from "../reducers/pets.selector";
import { TutorialCategory } from "../models/tutorial-category.model";
import { Tutorial } from "../models/tutorial.model";
import { TutorialsService } from "../services/tutorials.service";
import { Toasty } from "@triniwiz/nativescript-toasty";

@Injectable()
export class PetsFacades {
  query = {
    pets: {
      entities$: this.store.select(petsQuery.getPets),
      loading$: this.store.select(petsQuery.getPetsLoading),
      loaded$: this.store.select(petsQuery.getPetsLoaded),
      error$: this.store.select(petsQuery.getPetsError),
      saving$: this.store.select(petsQuery.getPetsSaving),
    },
    tutorials: {
      entities$: this.store.select(petsQuery.getTutorials),
      loading$: this.store.select(petsQuery.getTutorialsLoading),
      error$: this.store.select(petsQuery.getTutorialsError),
    },
  };

  constructor(
    private store: Store,
    private petsService: PetsService,
    private tutorialsService: TutorialsService
  ) {}

  getAllPets(): Observable<Pet[]> {
    this.store.dispatch(PetsPageActions.getAllPets());

    return this.petsService.getAllPets().pipe(
      tap({
        next: (pets) => {
          this.store.dispatch(PetsApiActions.getAllPetsSuccess({ pets }));
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon fetching pets. Please try again.",
          }).show();

          this.store.dispatch(PetsApiActions.getAllPetsFailure({ error }));
        },
      })
    );
  }

  addPet(pet: Pet): Observable<Pet> {
    this.store.dispatch(PetsPageActions.addPet());

    return this.petsService.addPet(pet).pipe(
      tap({
        next: (pet) => {
          this.store.dispatch(PetsApiActions.addPetSuccess({ pet }));
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon adding pet. Please try again.",
          }).show();

          this.store.dispatch(PetsApiActions.addPetFailure({ error }));
        },
      })
    );
  }

  editPet(pet: Pet): Observable<Pet> {
    this.store.dispatch(PetsPageActions.editPet());

    return this.petsService.editPet(pet).pipe(
      tap({
        next: (pet) => {
          this.store.dispatch(PetsApiActions.editPetSuccess({ pet }));
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon editing pet. Please try again.",
          }).show();

          this.store.dispatch(PetsApiActions.editPetFailure({ error }));
        },
      })
    );
  }

  deletePet(id: number): Observable<Pet> {
    this.store.dispatch(PetsPageActions.deletePet());

    return this.petsService.deletePet(id).pipe(
      tap({
        next: (pet) => {
          this.store.dispatch(PetsApiActions.deletePetSuccess({ pet }));
        },
        error: () => {
          new Toasty({
            text: "Error upon deleting pet. Please try again.",
          }).show();
        },
      })
    );
  }

  getTutorialsByCategory(
    petId: number,
    category: TutorialCategory
  ): Observable<Tutorial[]> {
    this.store.dispatch(PetsPageActions.getTutorialsByCategory());

    return this.tutorialsService.getTutorialsByCategory(petId, category).pipe(
      tap({
        next: (tutorials) => {
          this.store.dispatch(
            PetsApiActions.getTutorialsByCategorySuccess({ tutorials })
          );
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon fetching tutorials. Please try again.",
          }).show();

          this.store.dispatch(
            PetsApiActions.getTutorialsByCategoryFailure({ error })
          );
        },
      })
    );
  }
}
