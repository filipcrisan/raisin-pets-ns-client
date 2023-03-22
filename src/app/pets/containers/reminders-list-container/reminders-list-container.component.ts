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
import { tap } from "rxjs";

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

  ngOnDestroy(): void {
    this.remindersFacades.clearReminders();
  }

  onAddReminder(): void {
    this.routerExtensions
      .navigate([`pets/dashboard/add-reminder/${this.petId}`])
      .then();
  }

  onDelete(reminderId: number): void {
    Dialogs.action({
      message: "Are you sure you want to delete this reminder?",
      cancelButtonText: "Cancel",
      actions: ["Delete"],
    }).then(async (result) => {
      if (result === "Delete") {
        this.remindersFacades
          .deleteReminder(this.petId, reminderId)
          .pipe(
            untilDestroyed(this),
            tap({
              next: async () => {
                new Toasty({
                  text: "Cancelling local notification...",
                }).show();
                await this.localNotificationsService.cancel(reminderId);
              },
            })
          )
          .subscribe();
      }
    });
  }
}
