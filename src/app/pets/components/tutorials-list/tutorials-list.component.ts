import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Tutorial } from "../../models/tutorial.model";
import { HttpErrorResponse } from "@angular/common/http";
import { FormControl, FormGroup } from "@angular/forms";
import { TutorialCategory } from "../../models/tutorial-category.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { distinctUntilChanged, filter } from "rxjs";
import { Species } from "../../models/species.model";
import { Size } from "../../models/size.model";
import { SelectedIndexChangedEventData } from "nativescript-drop-down";
import { Dialogs } from "@nativescript/core";

@UntilDestroy()
@Component({
  selector: "app-tutorials-list",
  templateUrl: "./tutorials-list.component.html",
  styleUrls: ["./tutorials-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsListComponent implements OnInit {
  @Input() tutorials: Tutorial[];
  @Input() loading: boolean;
  @Input() error: HttpErrorResponse;

  @Output() getTutorials = new EventEmitter<TutorialCategory>();

  categoriesOptions = ["Hygiene", "Food", "Entertainment"];
  selectedCategoryIndex = 0;

  tutorialsForm = new FormGroup({
    category: new FormControl(TutorialCategory.Hygiene),
  });

  Species = Species;
  Size = Size;

  ngOnInit() {
    this.getTutorials.emit(this.tutorialsForm.controls.category.value);

    this.tutorialsForm.controls.category.valueChanges
      .pipe(
        untilDestroyed(this),
        filter((x) => !!x),
        distinctUntilChanged()
      )
      .subscribe((x) => {
        this.getTutorials.emit(x);
      });
  }

  onCategoryChange(args: SelectedIndexChangedEventData) {
    this.tutorialsForm.controls.category.setValue(args.newIndex + 1);
  }

  onTapItem(item: Tutorial): void {
    Dialogs.confirm({
      title: "Tutorial details",
      message: `Name: ${item.name}\nFrequency: ${item.frequency}\nDescription: ${item.content}`,
      cancelButtonText: "Close",
    }).then();
  }
}
