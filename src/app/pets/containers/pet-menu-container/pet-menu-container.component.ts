import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RouterExtensions } from "@nativescript/angular";
import { SharedFacades } from "~/app/pets/facades/shared.facades";

@Component({
  selector: "app-pet-menu-container",
  templateUrl: "./pet-menu-container.component.html",
  styleUrls: ["./pet-menu-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PetMenuContainerComponent
  implements AfterViewInit, OnInit, OnDestroy
{
  petId!: number;

  constructor(
    private sharedFacades: SharedFacades,
    private activatedRoute: ActivatedRoute,
    private routerExtensions: RouterExtensions
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];
  }

  ngAfterViewInit(): void {
    console.log("Menu: ", Date.now());
  }

  ngOnInit() {
    this.sharedFacades.clearPetDetails();
  }

  @HostListener("unloaded")
  ngOnDestroy() {
    // we need this in order to destroy the component every time we navigate away (for now)
  }

  onGoToTutorials(): void {
    console.log("Navigate to tutorials: ", Date.now());
    this.routerExtensions
      .navigate([`pets/dashboard/tutorials/${this.petId}`])
      .then();
  }

  onGoToExerciseTracking(): void {
    console.log("Navigate to exercises: ", Date.now());
    this.routerExtensions
      .navigate([`pets/dashboard/exercises/${this.petId}`])
      .then();
  }

  onGoToReminders(): void {
    console.log("Navigate to reminders: ", Date.now());
    this.routerExtensions
      .navigate([`pets/dashboard/reminders/${this.petId}`])
      .then();
  }
}
