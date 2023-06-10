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
import { MediaTileListComponent } from '@nyan-inc/ui';

@Component({
  selector: 'curator-details-main',
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
    MediaTileComponent,
    MediaTileListComponent,
  ],
  templateUrl: './curator-details.component.html',
  styleUrls: ['./curator-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CuratorDetailsComponent {
  constructor(
    public readonly musicAPIFacade: MusicAPIFacade,
    private readonly musicFacade: MusicFacade
  ) {
    console.log('CuratorDetailsComponent');
  }
  stationID?: string;

  play(type: string, id: string, shuffle = false) {
    shuffle
      ? this.musicFacade.shufflePlay(type, id)
      : this.musicFacade.setQueueThenPlay(type, id);
    setTimeout(() => this.musicFacade.play(), 1000);
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
