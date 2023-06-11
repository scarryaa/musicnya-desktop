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
import { HeadingComponent } from '@nyan-inc/ui';
import { MediaTileSmallComponent } from '../media-tile-small/media-tile-small.component';
import { GlassTileComponent } from '../glass-tile/glass-tile.component';
import { BannerHeroTileComponent } from '../banner-hero-tile/banner-hero-tile.component';

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

  @Output() readonly playEmitter: EventEmitter<{ type: string; id: string }> =
    new EventEmitter();
  @Output() readonly needCuratorEmitter: EventEmitter<string> =
    new EventEmitter();

  @HostBinding('ngIf') ngIf = this.data;
}
