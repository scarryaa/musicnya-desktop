import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { OptionsButtonComponent } from '../options-button/options-button.component';

@Component({
  selector: 'core-media-tile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PlayButtonComponent,
    OptionsButtonComponent,
  ],
  template: `<div class="media-tile-wrapper">
    <div class="media-tile">
      <div class="media-tile__image-wrapper">
        <img
          class="media-tile__image-wrapper__image"
          [src]="mediaImage"
          [style.minWidth.rem]="mediaImageSize"
          [style.minHeight.rem]="mediaImageSize"
          [style.aspectRatio]="1"
        />
        <div class="media-tile__image-overlay" [routerLink]="mediaLink">
          <core-play-button
            class="media-tile__image-overlay__play-button"
            (playEmitter)="handlePlayClick()"
          ></core-play-button>
          <core-options-button
            class="media-tile__image-overlay__options-button"
            (optionsEmitter)="handleOptionsClick()"
          ></core-options-button>
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

  handlePlayClick() {
    this.playEmitter.emit({ type: this.type || '', id: this.id || '' });
  }

  handleOptionsClick() {
    this.optionsEmitter.emit();
  }
}
