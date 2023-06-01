import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-media-tile-small',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="media-tile-small-wrapper">
    <div class="media-tile-small">
      <div class="media-tile-small__wrapper">
        <img
          class="media-tile-small__wrapper__image"
          [src]="mediaImage"
          [style.minHeight.rem]="mediaImageSize"
        />
        <div class="media-tile-small__wrapper__overlay">
          <div class="media-tile-small__wrapper__overlay__play-button">
            <div class="media-tile-small__wrapper__overlay__play-button__icon">
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
          </div>
        </div>
      </div>
      <div class="media-tile-small__info">
        <div class="media-tile-small__info__title" [title]="mediaTitle">
          {{ mediaTitle }}
        </div>
        <div class="media-tile-small__info__subtitle" [title]="mediaSubtitle">
          {{ mediaSubtitle }}
        </div>
      </div>
    </div>
  </div>`,
  styleUrls: ['./media-tile-small.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaTileSmallComponent {
  @Input() mediaTitle: string | undefined = undefined;
  @Input() mediaSubtitle: string | undefined = undefined;
  @Input() mediaImage: string | undefined = undefined;
  @Input() mediaImageSize: number | undefined = undefined;
}
