import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { HttpErrorResponse } from "@angular/common/http";
import { Store } from "@ngrx/store";
import { PetsApiActions, PetsPageActions } from "../actions";
import { petsQuery } from "../reducers/pets.selector";
import { Toasty } from "@triniwiz/nativescript-toasty";
import { RemindersService } from "../services/reminders.service";
import { Reminder } from "../models/reminder.model";

@Injectable()
export class RemindersFacades {
  query = (petId: number) => ({
    reminders: {
      entities$: this.store.select(petsQuery.getReminders(petId)),
      loading$: this.store.select(petsQuery.getRemindersLoading(petId)),
      loaded$: this.store.select(petsQuery.getRemindersLoaded(petId)),
      error$: this.store.select(petsQuery.getRemindersError(petId)),
      saving$: this.store.select(petsQuery.getRemindersSaving(petId)),
    },
  });

  constructor(
    private store: Store,
    private remindersService: RemindersService
  ) {}

  getAllReminders(petId: number): Observable<Reminder[]> {
    this.store.dispatch(PetsPageActions.getAllReminders({ petId }));

    return this.remindersService.getAllReminders(petId).pipe(
      tap({
        next: (reminders) => {
          this.store.dispatch(
            PetsApiActions.getAllRemindersSuccess({ petId, reminders })
          );
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon fetching reminders. Please try again.",
          }).show();

          this.store.dispatch(
            PetsApiActions.getAllRemindersFailure({ petId, error })
          );
        },
      })
    );
  }

  addReminder(reminder: Reminder): Observable<Reminder> {
    this.store.dispatch(PetsPageActions.addReminder({ petId: reminder.petId }));

    return this.remindersService.addReminder(reminder).pipe(
      tap({
        next: (reminder) => {
          this.store.dispatch(PetsApiActions.addReminderSuccess({ reminder }));
        },
        error: (error: HttpErrorResponse) => {
          new Toasty({
            text: "Error upon adding reminder. Please try again.",
          }).show();

          this.store.dispatch(
            PetsApiActions.addReminderFailure({ petId: reminder.petId, error })
          );
        },
      })
    );
  }

  deleteReminder(petId: number, reminderId: number): Observable<Reminder> {
    this.store.dispatch(PetsPageActions.deleteReminder({ petId }));

    return this.remindersService.deleteReminder(petId, reminderId).pipe(
      tap({
        next: (reminder) => {
          this.store.dispatch(
            PetsApiActions.deleteReminderSuccess({ reminder })
          );
        },
        error: () => {
          new Toasty({
            text: "Error upon deleting reminder. Please try again.",
          }).show();
        },
      })
    );
  }
}
