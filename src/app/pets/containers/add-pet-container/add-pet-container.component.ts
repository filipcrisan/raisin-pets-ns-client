import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-add-pet-container',
  templateUrl: './add-pet-container.component.html',
  styleUrls: ['./add-pet-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPetContainerComponent {

}
