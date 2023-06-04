import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaDetailsDropdownModule } from '@nyan-inc/ui';
import {
  AlbumTileLargeModule,
  AlbumTileLargeSmartModule,
  BaseButtonModule,
} from '@nyan-inc/core';
import { Observable, Subject } from 'rxjs';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
import { LetDirective } from '@ngrx/component';
import { YearSlicePipe } from '@nyan-inc/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'musicnya-song-album-details',
  standalone: true,
  templateUrl: './song-album-details.component.html',
  styleUrls: ['./song-album-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    AlbumTileLargeModule,
    AlbumTileLargeSmartModule,
    BaseButtonModule,
    MediaDetailsDropdownModule,
    LetDirective,
    YearSlicePipe,
    RouterModule,
  ],
})
export class SongAlbumDetailsComponent implements OnDestroy {
  state$: Observable<any>;
  musicState$: MusicFacade;

  destroy$ = new Subject<void>();

  constructor(
    private musicAPIFacade: MusicAPIFacade,
    private musicFacade: MusicFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
    this.musicState$ = this.musicFacade;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
