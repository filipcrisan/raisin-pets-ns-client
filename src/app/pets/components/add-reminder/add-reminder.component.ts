import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, FormGroup } from "@angular/forms";
import { Reminder } from "../../models/reminder.model";

@Component({
  selector: "app-add-reminder",
  templateUrl: "./add-reminder.component.html",
  styleUrls: ["./add-reminder.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddReminderComponent {
  @Input() saving: boolean;
  @Input() error: HttpErrorResponse;

  @Output() addReminder = new EventEmitter<Reminder>();

  reminderForm = new FormGroup({
    body: new FormControl(""),
    time: new FormControl<Date>(new Date(Date.now())),
  });

  onSave(): void {
    if (!this.reminderForm.valid) {
      return;
    }

    const reminder: Reminder = {
      title: `It's ${this.time.getHours()}:${this.time.getMinutes()}!`,
      body: this.body,
      hours: this.time.getHours(),
      minutes: this.time.getMinutes(),
      enabled: true,
    };

    this.addReminder.emit(reminder);
  }

  get body(): string {
    return this.reminderForm.controls.body.value;
  }

  get time(): Date {
    return this.reminderForm.controls.time.value;
  }
}
