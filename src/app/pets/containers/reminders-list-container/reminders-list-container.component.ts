import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { LocalNotificationsService } from "../../../shared/services/local-notifications.service";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { RemindersFacades } from "../../facades/reminders.facades";
import { Dialogs } from "@nativescript/core";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { distinctUntilChanged, filter, switchMap, tap } from "rxjs";

@UntilDestroy()
@Component({
  selector: "app-reminders-list-container",
  templateUrl: "./reminders-list-container.component.html",
  styleUrls: ["./reminders-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersListContainerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  remindersQuery: any;

  petId!: number;

  constructor(
    private localNotificationsService: LocalNotificationsService,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private remindersFacades: RemindersFacades
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
    this.remindersQuery = this.remindersFacades.query(this.petId).reminders;
  }

  ngAfterViewInit(): void {
    console.log("Reminders list: ", Date.now());
  }

  ngOnInit(): void {
    this.remindersQuery.loaded$
      .pipe(
        untilDestroyed(this),
        distinctUntilChanged(),
        filter((loaded) => !loaded),
        switchMap(() => this.remindersFacades.getAllReminders(this.petId))
      )
      .subscribe();
  }

  @HostListener("unloaded")
  ngOnDestroy() {
    // we need this in order to destroy the subscription from ngOnInit
  }

  onRefreshList(): void {
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
