import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Pet } from "../../models/pet.model";
import { PetsFacades } from "../../facades/pets.facades";
import { UntilDestroy, untilDestroyed } from "@ngneat/until-destroy";
import { BehaviorSubject, tap } from "rxjs";
import { RouterExtensions } from "@nativescript/angular";
import { ActivatedRoute } from "@angular/router";
import { CameraService } from "../../../shared/services/camera.service";

@UntilDestroy()
@Component({
  selector: "app-add-pet-container",
  templateUrl: "./add-pet-container.component.html",
  styleUrls: ["./add-pet-container.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPetContainerComponent {
  petsQuery = this.petsFacades.query;

  avatarInBase64$ = new BehaviorSubject<string>(null);

  constructor(
    private petsFacades: PetsFacades,
    private routerExtensions: RouterExtensions,
    private activatedRoute: ActivatedRoute,
    private cameraService: CameraService
  ) {}

  onAddPet(pet: Pet): void {
    this.petsFacades
      .addPet(pet)
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
    const canUseCamera = this.cameraService.canUseCamera();

    if (!canUseCamera) {
      this.cameraService.requestPermission().then(
        async () => {
          await this.takePicture();
        },
        () => {}
      );

      return;
    }

    await this.takePicture();
  }

  private async takePicture(): Promise<void> {
    const image = await this.cameraService.takePicture();

    this.avatarInBase64$.next(
      this.cameraService.getImageUrl(image.toBase64String("jpg", 90))
    );
  }
}
