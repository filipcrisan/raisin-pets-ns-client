import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {RouterExtensions} from "@nativescript/angular";

@UntilDestroy()
@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsPageComponent {
  constructor(
    private routerExtensions: RouterExtensions,
  ) {}

  logout(): void {
    this.routerExtensions.navigate([""]);
  }
}
