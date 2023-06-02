import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MusicAPIFacade } from '@nyan-inc/shared';
import {
  FeaturedTileComponent,
  MediaTileComponent,
  TopSongsComponent,
  VideoTileComponent,
  MediaTileSmallComponent,
  ArtistTileComponent,
  BaseButtonModule,
} from '@nyan-inc/core';

@Component({
  selector: 'artist-details-main',
  standalone: true,
  imports: [
    CommonModule,
    LetDirective,
    MediaTileComponent,
    VideoTileComponent,
    FeaturedTileComponent,
    TopSongsComponent,
    MediaTileSmallComponent,
    ArtistTileComponent,
    BaseButtonModule,
  ],
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsComponent {
  constructor(public musicAPIFacade: MusicAPIFacade) {
    console.log('ArtistDetailsComponent');
  }
}
