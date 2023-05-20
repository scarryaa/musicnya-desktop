import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'core-drag-tooltip',
  standalone: true,
  imports: [CommonModule, DragDropModule],
  template: `<div
    *cdkDragPreview
    class="tooltip"
    [style.left]="left + 'px'"
    [style.top]="top + 'px'"
  >
    {{ tooltip }}
  </div>`,
  styleUrls: ['./drag-tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DragTooltipComponent {
  constructor(public changeDetectorRef: ChangeDetectorRef) {}
  tooltip = '';
  left = 0;
  top = 0;
}
