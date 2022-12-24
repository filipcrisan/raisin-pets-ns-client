import {ChangeDetectionStrategy, Component} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {AuthFacades} from "../../../facades/auth.facades";

@UntilDestroy()
@Component({
  selector: 'app-pets-page',
  templateUrl: './pets-page.component.html',
  styleUrls: ['./pets-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PetsPageComponent {
  constructor(
    private authFacades: AuthFacades
  ) {}

  logout(): void {
    this.authFacades.logout();
  }
}
