import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
  }
)

export class FooterComponent {
  volumeValue = new FormControl<number>(0);
  playbackValue = new FormControl<number>(0);

  //TODO add mute feature (e.g. fix current function) and change icon based on volume status

  //playback slider params
  disabled = false;
  max = 250;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;

  //volyme slider params
  volMax = 100;
  volMin = 0;
  volStep = 1;
}
