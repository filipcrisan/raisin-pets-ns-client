import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterExtensions} from "@nativescript/angular";

@Component({
  selector: 'app-landing-page-container',
  templateUrl: './landing-page-container.component.html',
  styleUrls: ['./landing-page-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageContainerComponent {
  constructor(
    private routerExtensions: RouterExtensions,
  ) {}

  signInWithGoogle(): void {
    this.routerExtensions.navigate(["pets/list"]);
  }
}
