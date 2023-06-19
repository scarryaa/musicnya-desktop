import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayButtonComponent } from '../play-button/play-button.component';
import { OptionsButtonComponent } from '../options-button/options-button.component';
import { RouterModule } from '@angular/router';
import { FormatImageURLPipe } from '../formatImageURL/format-image-url.pipe';

@Component({
  selector: 'core-video-tile',
  standalone: true,
  imports: [
    CommonModule,
    PlayButtonComponent,
    OptionsButtonComponent,
    RouterModule,
    FormatImageURLPipe
  ],
  template: `<div class="video-tile-wrapper">
    <div class="video-tile">
      <div class="video-tile__image-wrapper">
        <img
          class="video-tile__image-wrapper__image"
          [src]="(videoImage || '') | formatImageURL: 400"
          [style.minWidth.rem]="videoImageSize"
        />
        <div class="video-tile__image-overlay">
          <core-play-button
            (playEmitter)="handlePlayClick()"
          ></core-play-button>
          <core-options-button
            (optionsEmitter)="handleOptionsClick()"
          ></core-options-button>
        </div>
      </div>
      <div class="video-tile__title" [title]="videoTitle">{{ videoTitle }}</div>
      <div
        class="video-tile__subtitle"
        [title]="videoSubtitle"
        [ngClass]="{ 'video-tile__subtitle--hover': subtitleHover }"
        [routerLink]="subtitleHover ? videoSubtitleLink : undefined"
      >
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
  @Input() subtitleHover = false;
  @Input() videoSubtitleLink?: string;

  @Output() playClick = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsClick = new EventEmitter<void>();

  handlePlayClick() {
    this.playClick.emit({ type: this.type, id: this.id || '' });
  }

  handleOptionsClick() {
    this.optionsClick.emit();
  }
}
