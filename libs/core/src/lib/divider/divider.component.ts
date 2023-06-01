import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-divider',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="divider"></div>`,
  styles: [
    `
      .divider {
        position: relative;
        width: 2px;
        background-color: oklch(0 0 0 / 10%);
        height: 100px;
        margin: auto;
      }

      .divider:before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: inherit;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
      }

      .divider:after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 50%;
        background-color: inherit;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DividerComponent {}
