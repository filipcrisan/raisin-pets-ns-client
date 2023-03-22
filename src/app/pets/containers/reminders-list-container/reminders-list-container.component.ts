import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { LocalNotificationsService } from "../../../shared/services/local-notifications.service";
import { Toasty } from "@triniwiz/nativescript-toasty";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { RemindersFacades } from "../../facades/reminders.facades";
import { Dialogs } from "@nativescript/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-reminders-list-container",
  templateUrl: "./reminders-list-container.component.html",
  styleUrls: ["./reminders-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersListContainerComponent implements OnInit, OnDestroy {
  remindersQuery = this.remindersFacades.query.reminders;

  petId!: number;

  constructor(
    private localNotificationsService: LocalNotificationsService,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private remindersFacades: RemindersFacades
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  ngOnInit(): void {
    this.remindersFacades
      .getAllReminders(this.petId)
      .pipe(untilDestroyed(this))
      .subscribe();
  }

  async ngOnDestroy(): Promise<void> {
    new Toasty({
      text: "Cancelling all local notifications...",
    }).show();
    await this.localNotificationsService.cancelAll();
    this.remindersFacades.clearReminders();
  }

  async onAddReminder(): Promise<void> {
    const canSendNotifications =
      (await this.localNotificationsService.canSendLocalNotifications()) ||
      (await this.localNotificationsService.requestPermission());

    if (!canSendNotifications) {
      return;
    }

    this.localNotificationsService.schedule({
      id: 1,
      petId: this.petId,
      title: "it's time",
      body: "wow",
      hours: 14,
      minutes: 53,
      enabled: true,
    });
  }

  onDelete(reminderId: number): void {
    Dialogs.action({
      message: "Are you sure you want to delete this reminder?",
      cancelButtonText: "Cancel",
      actions: ["Delete"],
    }).then((result) => {
      if (result === "Delete") {
        this.remindersFacades
          .deleteReminder(this.petId, reminderId)
          .pipe(untilDestroyed(this))
          .subscribe();
      }
    });
  }

  onSelect(id: number): void {
    this.routerExtensions
      .navigate([`pets/dashboard/reminder/${id}/details`])
      .then();
  }
}
