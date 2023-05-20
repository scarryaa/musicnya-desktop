import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-tooltip',
  standalone: true,
  imports: [CommonModule],
  template: `<div
    class="tooltip"
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
  constructor(public changeDetectorRef: ChangeDetectorRef) {}
  tooltip = '';
  left = 0;
  top = 0;
}
