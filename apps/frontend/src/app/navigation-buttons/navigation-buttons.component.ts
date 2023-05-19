import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { NavigationButtonSmartModule } from '@nyan-inc/core';

@Component({
  selector: 'musicnya-navigation-buttons',
  standalone: true,
  imports: [CommonModule, NavigationButtonSmartModule],
  templateUrl: './navigation-buttons.component.html',
  styleUrls: ['./navigation-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonsComponent {
  constructor(private location: Location) {}

  goBack() {
    this.location.back();
  }

  goForward() {
    this.location.forward();
  }
}
