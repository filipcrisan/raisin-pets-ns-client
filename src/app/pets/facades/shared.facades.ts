import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { PetsPageActions } from "../actions";
import { State } from "../reducers";
import { AuthFacades } from "../../facades/auth.facades";

@Injectable()
export class SharedFacades {
  constructor(private store: Store<State>, private authFacades: AuthFacades) {}

  logout(): void {
    this.store.dispatch(PetsPageActions.clearState());

    this.authFacades.logout();
  }

  // TODO: remove this
  clearPetDetails(): void {
    this.store.dispatch(PetsPageActions.clearTutorials());
    this.store.dispatch(PetsPageActions.clearReminders());
  }
}
