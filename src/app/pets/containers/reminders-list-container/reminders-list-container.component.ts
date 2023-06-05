import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { LocalNotificationsService } from "../../../shared/services/local-notifications.service";
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
export class RemindersListContainerComponent implements OnInit, AfterViewInit {
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

  ngAfterViewInit(): void {
    console.log("Reminders list: ", Date.now());
  }

  ngOnInit(): void {
    this.remindersFacades
      .getAllReminders(this.petId)
      .pipe(untilDestroyed(this))
      .subscribe();
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
                await this.localNotificationsService.cancel(reminderId);
              },
            })
          )
          .subscribe();
      }
    });
  }
}
