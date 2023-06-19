import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaTileComponent } from '../media-tile/media-tile.component';
import { FormatImageURLPipe } from "../formatImageURL/format-image-url.pipe";

@Component({
    selector: 'core-glass-tile',
    standalone: true,
    template: `<span class="content__badge">{{ badge }}</span>
    <div class="glass-tile">
      <core-media-tile
        class="glass-tile__media"
        [mediaTitle]="title"
        [mediaSubtitle]="artist"
        [mediaImage]="image"
        [type]="type"
        [mediaLink]="type !== 'stations' ? link : undefined"
        (playEmitter)="playEmitter.emit({ type: type!, id: id! })"
      ></core-media-tile>
      <div class="glass-tile__info">
        <img class="content__blur__image" [src]="(image || '') | formatImageURL: 400" />
        <div class="content__blur">
          <a
            class="content__blur__title"
            [style.cursor]="titleLink ? 'pointer' : 'default'"
            [attr.href]="titleLink ? titleLink : '#'"
            [target]="titleLink ? '_blank' : '_self'"
            >{{ title }}</a
          >
          <div class="content__blur__artist-subtitle">
            <span class="content__blur__artist-subtitle__artist">{{
              artist
            }}</span>
            <span class="content__blur__artist-subtitle__subtitle">{{
              subtitle
            }}</span>
          </div>
        </div>
      </div>
    </div>`,
    styleUrls: ['./glass-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, MediaTileComponent, FormatImageURLPipe]
})
export class GlassTileComponent {
  @Input() badge?: string;
  @Input() title?: string;
  @Input() artist?: string;
  @Input() subtitle?: string;
  @Input() image?: string;
  @Input() type?: string;
  @Input() id?: string;
  @Input() link?: string;
  @Input() titleLink?: string;

  @Output() playEmitter = new EventEmitter<{ type: string; id: string }>();
  @Output() optionsEmitter = new EventEmitter<string>();
}
