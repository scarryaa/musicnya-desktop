import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationButtonPresentationModule } from '../navigation-button-presentation/navigation-button-presentation.component';

@Component({
  selector: 'core-navigation-button',
  template: `<core-navigation-button-presentation
    ><ng-content></ng-content
  ></core-navigation-button-presentation>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationButtonSmartComponent {}

@NgModule({
  imports: [CommonModule, NavigationButtonPresentationModule],
  exports: [NavigationButtonSmartComponent],
  declarations: [NavigationButtonSmartComponent],
})
export class NavigationButtonSmartModule {}
