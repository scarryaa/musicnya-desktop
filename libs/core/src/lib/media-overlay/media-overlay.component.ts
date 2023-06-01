import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-media-overlay',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="media-overlay-wrapper">
    <div class="media-overlay">
      <div class="media-overlay__play-button"></div>
      <div class="media-overlay__options-button"></div>
    </div>
  </div>`,
  styles: [
    `
      .media-overlay {
        position: ;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 98;
        position: relative;

        .media-overlay__play-button {
          position: absolute;
          border-radius: 50%;
          width: 3rem;
          height: 3rem;
          background-color: red;
          z-index: 99999999999999;
          bottom: 4rem;
          left: 0;
          pointer: cursor;

          :hover {
            background-color: blue;
          }
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaOverlayComponent {}
