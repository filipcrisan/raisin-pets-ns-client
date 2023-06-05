import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
} from "@angular/core";
import { PetsFacades } from "../../facades/pets.facades";
import { ActivatedRoute } from "@angular/router";
import { TutorialCategory } from "../../models/tutorial-category.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: "app-tutorials-list-container",
  templateUrl: "./tutorials-list-container.component.html",
  styleUrls: ["./tutorials-list-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsListContainerComponent implements AfterViewInit {
  tutorialsQuery = this.petsFacades.query.tutorials;

  petId!: number;

  constructor(
    private petsFacades: PetsFacades,
    private activatedRoute: ActivatedRoute
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  ngAfterViewInit(): void {
    console.log("Tutorials list: ", Date.now());
  }

  onGetTutorials(category: TutorialCategory): void {
    console.log("Start list: ", Date.now());
    this.petsFacades
      .getTutorialsByCategory(this.petId, category)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        console.log("End list: ", Date.now());
      });
  }
}
