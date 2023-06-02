import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'core-media-tile',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<div class="media-tile-wrapper">
    <div class="media-tile">
      <div class="media-tile__image-wrapper">
        <img
          class="media-tile__image-wrapper__image"
          [src]="mediaImage"
          [style.minWidth.rem]="mediaImageSize"
        />
        <div class="media-tile__image-overlay" [routerLink]="mediaLink">
          <div
            class="media-tile__image-overlay__play-button"
            (click)="handlePlayClick($event)"
          >
            <div class="media-tile__image-overlay__play-button__icon">
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
            class="media-tile__image-overlay__options-button"
            (click)="handleOptionsClick($event)"
          >
            <div class="media-tile__image-overlay__options-button__icon">
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
      <div
        class="media-tile__title"
        [routerLink]="mediaLink"
        [title]="mediaTitle"
      >
        {{ mediaTitle }}
      </div>
      <div
        [ngClass]="{ hover_underline: subtitleHover }"
        [routerLink]="subtitleHover ? subtitleLink : undefined"
        class="media-tile__subtitle"
        [title]="mediaSubtitle"
      >
        {{ mediaSubtitle }}
      </div>
    </div>
  </div>`,
  styleUrls: ['./media-tile.component.scss'],
})
export class MediaTileComponent {
  @Input() mediaTitle: string | undefined = undefined;
  @Input() mediaSubtitle: string | undefined = undefined;
  @Input() mediaImage: string | undefined = undefined;
  @Input() mediaImageSize: number | undefined = undefined;
  @Input() mediaLink?: string;
  @Input() subtitleLink?: string;
  @Input() id?: string;
  @Input() type?: string;
  @Input() subtitleHover = true;

  @Output() playEmitter = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsEmitter = new EventEmitter();

  handlePlayClick(event: MouseEvent) {
    event.stopPropagation();
    this.playEmitter.emit({ type: this.type || '', id: this.id || '' });
  }

  handleOptionsClick(event: MouseEvent) {
    event.stopPropagation();
    this.optionsEmitter.emit(event);
  }
}
