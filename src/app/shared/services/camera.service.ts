import { Injectable } from "@angular/core";
import * as camera from "@nativescript/camera";
import { ImageSource } from "@nativescript/core";

@Injectable({
  providedIn: "root",
})
export class CameraService {
  requestPermission(): Promise<void> {
    return camera.requestCameraPermissions();
  }

  canUseCamera(): boolean {
    return camera.isAvailable().valueOf();
  }

  async takePicture(): Promise<ImageSource> {
    const options = {
      width: 300,
      height: 300,
      keepAspectRatio: false,
      saveToGallery: false,
    };

    const imageAsset = await camera.takePicture(options);

    return await ImageSource.fromAsset(imageAsset);
  }

  getImageUrl(imageInBase64: string): string {
    return "data:image/jpg;base64," + imageInBase64;
  }
}
