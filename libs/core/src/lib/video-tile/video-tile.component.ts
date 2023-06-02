import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'core-video-tile',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="video-tile-wrapper">
    <div class="video-tile">
      <div class="video-tile__image-wrapper">
        <img
          class="video-tile__image-wrapper__image"
          [src]="videoImage"
          [style.minWidth.rem]="videoImageSize"
        />
        <div class="video-tile__image-overlay">
          <div
            class="video-tile__image-overlay__play-button"
            (click)="handlePlayClick($event)"
          >
            <div class="video-tile__image-overlay__play-button__icon">
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
          <div
            class="video-tile__image-overlay__options-button"
            (click)="handleOptionsClick($event)"
          >
            <div class="video-tile__image-overlay__options-button__icon">
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
                <circle cx="12" cy="12" r="1"></circle>
                <circle cx="12" cy="5" r="1"></circle>
                <circle cx="12" cy="19" r="1"></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div class="video-tile__title" [title]="videoTitle">{{ videoTitle }}</div>
      <div class="video-tile__subtitle" [title]="videoSubtitle">
        {{ videoSubtitle }}
      </div>
    </div>
  </div>`,
  styleUrls: ['./video-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoTileComponent {
  @Input() videoTitle: string | undefined = undefined;
  @Input() videoSubtitle: string | undefined = undefined;
  @Input() videoImage: string | undefined = undefined;
  @Input() videoImageSize: number | undefined = undefined;
  @Input() id?: string;
  @Input() type = 'videos';

  @Output() playClick = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsClick = new EventEmitter<void>();

  handlePlayClick(event: MouseEvent) {
    event.stopPropagation();
    this.playClick.emit({ type: this.type, id: this.id || '' });
  }

  handleOptionsClick(event: MouseEvent) {
    event.stopPropagation();
    this.optionsClick.emit();
  }
}
