import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { Exercise } from "../../models/exercise.model";
import { HttpErrorResponse } from "@angular/common/http";
import { Page } from "@nativescript/core";
import { Menu } from "nativescript-menu";
import { Reminder } from "../../models/reminder.model";
import { Pet } from "../../models/pet.model";
import { Species } from "../../models/species.model";
import { Const } from "../../models/constants.model";

@Component({
  selector: "app-reminders-list",
  templateUrl: "./reminders-list.component.html",
  styleUrls: ["./reminders-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RemindersListComponent {
  @Input() reminders: Reminder[];
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  @Output() delete = new EventEmitter<number>();
  @Output() selectReminder = new EventEmitter<number>();

  constructor(private page: Page) {}

  onActionsTap(id: number): void {
    Menu.popup({
      view: this.page.getViewById("menuButton"),
      actions: [{ id: "1", title: "Delete" }],
      cancelButtonText: "Cancel",
    })
      .then((action) => {
        if (action.id !== "1") {
          return;
        }

        this.delete.emit(id);
      })
      .catch(console.log);
  }

  onSelectReminder(id: number): void {
    this.selectReminder.emit(id);
  }
}
