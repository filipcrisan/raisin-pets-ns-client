import { Reminder } from './reminder.model';
import { HttpErrorResponse } from '@angular/common/http';

export type RemindersOfPetStateType = {
  entities: Reminder[];
  loading: boolean;
  loaded: boolean;
  saving: boolean;
  error: HttpErrorResponse;
};

export const defaultRemindersOfPetState: RemindersOfPetStateType = {
  entities: [],
  loading: false,
  loaded: false,
  saving: false,
  error: null,
};
