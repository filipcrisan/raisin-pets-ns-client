import { Injectable } from "@angular/core";
import { LocalNotifications } from "@nativescript/local-notifications";
import { Reminder } from "../../pets/models/reminder.model";

@Injectable({
  providedIn: "root",
})
export class LocalNotificationsService {
  requestPermission(): Promise<boolean> {
    return LocalNotifications.requestPermission();
  }

  canSendLocalNotifications(): Promise<boolean> {
    return LocalNotifications.hasPermission();
  }

  schedule(reminder: Reminder): Promise<number[]> {
    const startAt = new Date();
    startAt.setHours(reminder.hours);
    startAt.setMinutes(reminder.minutes);
    startAt.setMilliseconds(0);

    return LocalNotifications.schedule([
      {
        ...reminder,
        image: "https://img.icons8.com/dusk/64/null/dog-bowl.png",
        interval: "day",
        at: startAt,
        forceShowWhenInForeground: true,
      },
    ]);
  }

  cancel(id: number): Promise<boolean> {
    return LocalNotifications.cancel(id);
  }
}
