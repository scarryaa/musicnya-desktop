import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  TopSongsComponent,
  FeaturedTileComponent,
  AlbumTileLargeSmartModule,
  ArtistTileComponent,
  MediaTileComponent,
  VideoTileComponent,
} from '@nyan-inc/core';
import { LetDirective } from '@ngrx/component';
import { MusicFacade, MusicAPIFacade } from '@nyan-inc/shared';
import { Observable } from 'rxjs';
import { ScrollingModule } from '@angular/cdk/scrolling';

@Component({
  selector: 'musicnya-artist-details-content',
  standalone: true,
  imports: [
    CommonModule,
    TopSongsComponent,
    LetDirective,
    FeaturedTileComponent,
    ScrollingModule,
    AlbumTileLargeSmartModule,
    ArtistTileComponent,
    MediaTileComponent,
    VideoTileComponent,
  ],
  templateUrl: './artist-details-content.component.html',
  styleUrls: ['./artist-details-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsContentComponent {
  state$: Observable<any>;
  musicState$: MusicFacade;

  constructor(
    private changeReference: ChangeDetectorRef,
    public musicAPIFacade: MusicAPIFacade,
    private musicFacade: MusicFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
    this.musicState$ = this.musicFacade;
  }
}
