import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Reminder } from "../models/reminder.model";

@Injectable()
export class RemindersService {
  apiUrl = `${environment.apiUrl}/pets`;

  constructor(private http: HttpClient) {}

  getAllReminders(petId: number): Observable<Reminder[]> {
    return this.http.get<Reminder[]>(`${this.apiUrl}/${petId}/reminders/list`);
  }

  addReminder(reminder: Reminder): Observable<Reminder> {
    return this.http.post<Reminder>(
      `${this.apiUrl}/${reminder.petId}/reminders`,
      reminder
    );
  }

  deleteReminder(petId: number, reminderId: number): Observable<Reminder> {
    return this.http.delete<Reminder>(
      `${this.apiUrl}/${petId}/reminders/${reminderId}`
    );
  }
}
