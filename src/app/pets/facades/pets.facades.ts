import { Injectable } from "@angular/core";
import { PetsService } from "../services/pets.service";
import { Observable, tap } from "rxjs";
import { Pet } from "../models/pet.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { PetsApiActions, PetsPageActions } from "../actions";
import { petsQuery } from "../reducers/pets.selector";

@Injectable()
export class PetsFacades {
  query = {
    pets: {
      entities$: this.store.select(petsQuery.getPets),
      loading$: this.store.select(petsQuery.getPetsLoading),
      error$: this.store.select(petsQuery.getPetsError),
      saving$: this.store.select(petsQuery.getPetsSaving),
    },
  };

  constructor(private store: Store, private petsService: PetsService) {}

  getAllPets(): Observable<Pet[]> {
    this.store.dispatch(PetsPageActions.getAllPets());

    return this.petsService.getAllPets().pipe(
      tap({
        next: (pets) => {
          this.store.dispatch(PetsApiActions.getAllPetsSuccess({ pets }));
        },
        error: (error: HttpErrorResponse) => {
          // TODO: add toast notification service

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
          // TODO: add toast notification service

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
          // TODO: add toast notification service

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
        error: (error: HttpErrorResponse) => {
          // TODO: add toast notification service
        },
      })
    );
  }
}
