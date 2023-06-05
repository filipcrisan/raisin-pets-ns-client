import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
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
import { NgChanges } from "~/app/shared/models/simple-changes-typed";
import { TutorialListItem } from "~/app/pets/models/tutorial-list-item.model";

@UntilDestroy()
@Component({
  selector: "app-tutorials-list",
  templateUrl: "./tutorials-list.component.html",
  styleUrls: ["./tutorials-list.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsListComponent implements OnInit, OnChanges {
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

  tutorialListItems: TutorialListItem[];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: NgChanges<TutorialsListComponent>) {
    if (changes.tutorials?.currentValue) {
      this.tutorialListItems = this.tutorials.map((x) => ({
        tutorial: x,
        expanded: false,
      }));
    }
  }

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

  onTutorialTap(index: number): void {
    this.tutorialListItems = this.tutorialListItems.map((listItem, i) => ({
      ...listItem,
      expanded: i === index ? !listItem.expanded : false,
    }));
  }
}
