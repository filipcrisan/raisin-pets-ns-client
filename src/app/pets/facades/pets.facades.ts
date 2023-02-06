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
}
