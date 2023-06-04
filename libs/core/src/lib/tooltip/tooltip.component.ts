import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipPosition, TooltipTheme } from './tooltip.enums';

@Component({
  selector: 'core-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="tooltip"
    [ngClass]="['tooltip--' + position, 'tooltip--' + theme]"
    [class.tooltip--visible]="visible"
    [style.left]="left + 'px'"
    [style.top]="top + 'px'"
  >
    {{ tooltip }}
  </div>`,
  styleUrls: ['./tooltip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TooltipComponent {
  position: TooltipPosition = TooltipPosition.DEFAULT;
  theme: TooltipTheme = TooltipTheme.DEFAULT;
  tooltip = '';
  left = 0;
  top = 0;
  visible = false;

  constructor(public changeDetectorRef: ChangeDetectorRef) {}
}
