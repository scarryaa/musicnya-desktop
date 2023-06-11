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

@Component({
  selector: 'core-tile-selector',
  standalone: true,
  imports: [
    CommonModule,
    MediaTileComponent,
    VideoTileComponent,
    HeadingComponent,
    MediaTileSmallComponent,
  ],
  templateUrl: './tile-selector.component.html',
  styleUrls: ['./tile-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TileSelectorComponent {
  @Input() data?: Array<MusicKit.MediaItem | MusicKit.Resource>;
  @Input() title?: string;

  @Output() readonly playEmitter: EventEmitter<{ type: string; id: string }> =
    new EventEmitter();
  @Output() readonly needCuratorEmitter: EventEmitter<string> =
    new EventEmitter();

  @HostBinding('ngIf') ngIf = this.data;
}
