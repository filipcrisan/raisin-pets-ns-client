import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { RemindersFacades } from "../../facades/reminders.facades";
import { Reminder } from "../../models/reminder.model";
import { tap } from "rxjs";
import { LocalNotificationsService } from "../../../shared/services/local-notifications.service";
import { Toasty } from "@triniwiz/nativescript-toasty";

@UntilDestroy()
@Component({
  selector: "app-add-reminder-container",
  templateUrl: "./add-reminder-container.component.html",
  styleUrls: ["./add-reminder-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReminderContainerComponent {
  remindersQuery = this.remindersFacades.query.reminders;

  petId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions,
    private remindersFacades: RemindersFacades,
    private localNotificationsService: LocalNotificationsService
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  onAddReminder(reminder: Reminder): void {
    reminder.petId = this.petId;

    this.remindersFacades
      .addReminder(reminder)
      .pipe(
        untilDestroyed(this),
        tap({
          next: async (reminder) => {
            await this.scheduleNotification(reminder);
          },
        })
      )
      .subscribe();
  }

  private async scheduleNotification(reminder: Reminder): Promise<void> {
    const canSendNotifications =
      (await this.localNotificationsService.canSendLocalNotifications()) ||
      (await this.localNotificationsService.requestPermission());

    if (!canSendNotifications) {
      new Toasty({
        text: "No permissions to show notifications.",
      }).show();
      return;
    }

    this.localNotificationsService.schedule(reminder).then(
      () => {
        this.routerExtensions.backToPreviousPage();
      },
      () => {
        new Toasty({
          text: "Error upon scheduling reminder. Please try again.",
        }).show();
      }
    );
  }
}
