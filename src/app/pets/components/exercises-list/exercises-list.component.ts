import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";
import { Exercise } from "../../models/exercise.model";
import { Menu } from "nativescript-menu";
import { Page } from "@nativescript/core";

@Component({
  selector: "app-exercises-list",
  templateUrl: "./exercises-list.component.html",
  styleUrls: ["./exercises-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExercisesListComponent {
  @Input() exercises: Exercise[];
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  @Output() selectExercise = new EventEmitter<number>();

  constructor(private page: Page) {}

  onActionsTap(id: number): void {
    Menu.popup({
      view: this.page.getViewById("menuButton"),
      actions: [],
      cancelButtonText: "Cancel",
    })
      .then((action) => {})
      .catch(console.log);
  }

  onSelectExercise(id: number): void {
    this.selectExercise.emit(id);
  }
}
