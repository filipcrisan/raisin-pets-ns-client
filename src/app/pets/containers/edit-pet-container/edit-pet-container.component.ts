import { ChangeDetectionStrategy, Component } from "@angular/core";
import { PetsFacades } from "../../facades/pets.facades";
import { ActivatedRoute } from "@angular/router";
import { Pet } from "../../models/pet.model";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, filter, map, tap } from "rxjs";
import { CameraService } from "../../../shared/services/camera.service";
import { RouterExtensions } from "@nativescript/angular";

@UntilDestroy()
@Component({
  selector: "app-edit-pet-container",
  templateUrl: "./edit-pet-container.component.html",
  styleUrls: ["./edit-pet-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditPetContainerComponent {
  petsQuery = this.petsFacades.query;

  petId!: number;
  pet$ = this.petsQuery.pets.entities$.pipe(
    map((x) => x.find((y) => y.id === this.petId))
  );
  avatarInBase64$ = new BehaviorSubject<string>(null);

  constructor(
    private petsFacades: PetsFacades,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private cameraService: CameraService
  ) {
    this.petId = +this.activatedRoute.snapshot.params["id"];

    this.pet$
      .pipe(
        untilDestroyed(this),
        filter((x) => !!x)
      )
      .subscribe((pet) => {
        this.avatarInBase64$.next(pet.avatarInBase64);
      });
  }

  onEditPet(pet: Pet): void {
    this.petsFacades
      .editPet(pet)
      .pipe(
        untilDestroyed(this),
        tap({
          next: () => {
            this.routerExtensions.backToPreviousPage();
          },
        })
      )
      .subscribe();
  }

  async onTakePicture(): Promise<void> {
    const image = await this.cameraService.takePicture();

    this.avatarInBase64$.next(
      this.cameraService.getImageUrl(image.toBase64String("jpg", 90))
    );
  }
}
