import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-play-button',
  standalone: true,
  imports: [CommonModule],
  template: ` <div
    class="play-button-wrapper"
    (click)="handlePlayClick($event)"
  >
    <div class="play-button-wrapper__icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1.5rem"
        height="1.5rem"
        viewBox="0 0 24 24"
        fill="white"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <polygon points="5 3 19 12 5 21 5 3"></polygon>
      </svg>
    </div>
  </div>`,
  styles: [
    `
      .play-button-wrapper {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: var(--secondary, red);

        .play-button-wrapper__icon {
          width: 1.5rem;
          height: 1.5rem;
          fill: white;
          margin-left: 0.2rem;
        }

        &:hover {
          transform: translate(-50%, -50%) scale(1.1);
        }

        &:active {
          transform: translate(-50%, -50%) scale(0.99) !important;
        }

        &:focus {
          outline: none;
        }

        &:focus-visible {
          outline: 2px solid var(--color-gray-100);
        }

        :is(svg) {
          width: 1.5rem;
          height: 1.5rem;
          fill: white;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayButtonComponent {
  handlePlayClick(event: MouseEvent) {
    event.stopPropagation();
    this.playEmitter.emit();
  }

  @Output() readonly playEmitter = new EventEmitter<void>();
}
