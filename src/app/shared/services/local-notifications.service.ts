import { Injectable } from "@angular/core";
import { LocalNotifications } from "@nativescript/local-notifications";
import { Reminder } from "../../pets/models/reminder.model";
import { Toasty } from "@triniwiz/nativescript-toasty";

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

  schedule(reminder: Reminder): void {
    const startAt = new Date();
    startAt.setHours(reminder.hours);
    startAt.setMinutes(reminder.minutes);
    startAt.setMilliseconds(0);

    LocalNotifications.schedule([
      {
        ...reminder,
        image: "https://img.icons8.com/dusk/64/null/dog-bowl.png",
        interval: "day",
        at: startAt,
        forceShowWhenInForeground: true,
      },
    ]).then(
      (scheduledIds) => {
        // TODO: delete this
        new Toasty({
          text: "Notification id(s) scheduled: " + JSON.stringify(scheduledIds),
        }).show();
      },
      () => {
        new Toasty({
          text: "Error upon scheduling reminder. Please try again.",
        }).show();
      }
    );
  }

  cancelAll(): Promise<void> {
    return LocalNotifications.cancelAll();
  }

  cancel(id: number): Promise<boolean> {
    return LocalNotifications.cancel(id);
  }
}
