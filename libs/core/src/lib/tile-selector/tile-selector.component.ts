import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicKit } from '@nyan-inc/shared-types';
import { MediaTileComponent } from '../media-tile/media-tile.component';
import { VideoTileComponent } from '../video-tile/video-tile.component';
import { MediaTileSmallComponent } from '../media-tile-small/media-tile-small.component';
import { GlassTileComponent } from '../glass-tile/glass-tile.component';
import { BannerHeroTileComponent } from '../banner-hero-tile/banner-hero-tile.component';
import { HeadingComponent } from '../heading/heading.component';
import { ArtistTileComponent } from '../artist-tile/artist-tile.component';

@Component({
  selector: 'core-tile-selector',
  standalone: true,
  imports: [
    CommonModule,
    MediaTileComponent,
    VideoTileComponent,
    HeadingComponent,
    MediaTileSmallComponent,
    GlassTileComponent,
    BannerHeroTileComponent,
    ArtistTileComponent
  ],
  templateUrl: './tile-selector.component.html',
  styleUrls: ['./tile-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileSelectorComponent {
  @Input() data?: Array<MusicKit.MediaItem | MusicKit.Resource>;
  @Input() title?: string;
  @Input() isGlass = false;
  @Input() isSuperhero = false;
  @Input() parentId?: string;

  @Output() readonly playEmitter: EventEmitter<{ type: string; id: string }> =
    new EventEmitter<{ type: string; id: string }>();
  @Output() readonly needCuratorEmitter: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() readonly linkEmitter: EventEmitter<{ type: string; id: string }> =
    new EventEmitter<{ type: string; id: string }>();

  handlePlayClick(type: string, id: string) {
    this.playEmitter.emit({ type, id });
  }

  handleLinkClick(type: string, id: string) {
    console.log('handleLinkClick', type, id);
    this.linkEmitter.emit({ type, id });
  }
}
