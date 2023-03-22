import { ChangeDetectionStrategy, Component, OnDestroy } from "@angular/core";
import { LocalNotificationsService } from "../../../shared/services/local-notifications.service";
import { Toasty } from "@triniwiz/nativescript-toasty";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-reminders-list-container",
  templateUrl: "./reminders-list-container.component.html",
  styleUrls: ["./reminders-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersListContainerComponent implements OnDestroy {
  petId!: number;

  constructor(
    private localNotificationsService: LocalNotificationsService,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  async ngOnDestroy(): Promise<void> {
    new Toasty({
      text: "Cancelling all local notifications",
    }).show();
    await this.localNotificationsService.cancelAll();
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
}
