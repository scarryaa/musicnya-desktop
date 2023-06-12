import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetDirective } from '@ngrx/component';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
import {
  FeaturedTileComponent,
  MediaTileComponent,
  TopSongsComponent,
  VideoTileComponent,
  MediaTileSmallComponent,
  ArtistTileComponent,
  BaseButtonModule,
  YearSlicePipe,
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
    YearSlicePipe,
  ],
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtistDetailsComponent {
  constructor(
    public readonly musicAPIFacade: MusicAPIFacade,
    private readonly musicFacade: MusicFacade
  ) {
    console.log('ArtistDetailsComponent');
  }
  stationID?: string;

  play(type: string, id: string, shuffle = false) {
    shuffle
      ? this.musicFacade.shufflePlay(type, id)
      : this.musicFacade.setQueueThenPlay(type, id);
    setTimeout(() => this.musicFacade.play(), 2000);
  }

  playAtIndex(type: string, id: string, index: number) {
    this.musicFacade.setQueueAndPlayAtIndex(type, id, index);
  }

  options(arguments_: any) {}

  //trackBys
  trackByIndex(index: number, item: any): any {
    return index;
  }
}
