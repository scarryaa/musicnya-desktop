import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-navigation-button-presentation',
  template: `<div class="navigation-button">
    <ng-content></ng-content>
  </div>`,
  styleUrls: ['./navigation-button-presentation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonPresentationComponent {}

@NgModule({
  imports: [CommonModule],
  exports: [NavigationButtonPresentationComponent],
  declarations: [NavigationButtonPresentationComponent],
})
export class NavigationButtonPresentationModule {}
