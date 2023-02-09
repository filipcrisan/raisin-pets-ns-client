import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from "@angular/core";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-landing-page",
  templateUrl: "./landing-page.component.html",
  styleUrls: ["./landing-page.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent {
  @Input() userLoading: boolean;
  @Input() userError: HttpErrorResponse;

  @Output() signInWithGoogle = new EventEmitter<void>();

  onSignInWithGoogle(): void {
    this.signInWithGoogle.emit();
  }
}
