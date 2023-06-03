import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
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
  ],
})
export class SongAlbumDetailsComponent implements OnDestroy {
  state$: Observable<any>;
  musicState$: MusicFacade;
  showAdditionalInfo = false;

  destroy$ = new Subject<void>();

  constructor(
    private changeReference: ChangeDetectorRef,
    private musicAPIFacade: MusicAPIFacade,
    private musicFacade: MusicFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
    this.musicState$ = this.musicFacade;
  }

  toggleShowContent() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
    this.changeReference.detectChanges();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
