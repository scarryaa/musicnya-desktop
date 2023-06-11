import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaTileComponent } from '../media-tile/media-tile.component';

@Component({
  selector: 'core-glass-tile',
  standalone: true,
  imports: [CommonModule, MediaTileComponent],
  template: `<span class="content__badge">{{ badge }}</span>
    <div class="glass-tile">
      <core-media-tile
        class="glass-tile__media"
        [mediaTitle]="title"
        [mediaSubtitle]="artist"
        [mediaImage]="image"
        [type]="type"
        [mediaLink]="link"
      ></core-media-tile>
      <div class="glass-tile__info">
        <img class="content__blur__image" [src]="image" />
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
})
export class GlassTileComponent {
  @Input() badge?: string;
  @Input() title?: string;
  @Input() artist?: string;
  @Input() subtitle?: string;
  @Input() image?: string;
  @Input() type?: string;
  @Input() link?: string;
  @Input() titleLink?: string;
}