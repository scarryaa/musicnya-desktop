import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-options-button',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    class="options-button-wrapper"
    (click)="handleOptionsClick($event)"
  >
    <div class="options-button-wrapper__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="white"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="12" cy="12" r="1"></circle>
        <circle cx="12" cy="5" r="1"></circle>
        <circle cx="12" cy="19" r="1"></circle>
      </svg>
    </div>
  </div>`,
  styles: [
    `
      .options-button-wrapper {
        position: absolute;
        bottom: 0;
        right: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        background-color: transparent;

        &:hover {
          transform: translate(-0.05rem, -0.05rem) scale(1.1);
        }

        &:active {
          transform: scale(0.99);
        }
      }

      .options-button-wrapper__icon {
        position: absolute;
        bottom: 0;
        right: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionsButtonComponent {
  handleOptionsClick(event: MouseEvent) {
    event.stopPropagation();
    this.optionsEmitter.emit();
  }

  @Output() readonly optionsEmitter = new EventEmitter<void>();
}
