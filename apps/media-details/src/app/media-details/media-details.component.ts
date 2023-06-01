import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  AfterViewInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MediaDetailsDropdownModule,
  VirtualTableSmartModule,
} from '@nyan-inc/ui';
import {
  AlbumTileLargeSmartModule,
  BaseButtonModule,
  ColorService,
} from '@nyan-inc/core';
import { FastAverageColorResult } from 'fast-average-color';
import { MusicAPIFacade } from '@nyan-inc/shared';
import { map, Observable, Subject, takeUntil, tap } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import Color from 'colorjs.io';
import { ArtistDetailsComponent } from '../artist-details/artist-details.component';
import { ArtistDetailsContentComponent } from '../artist-details-content/artist-details-content.component';
import { SongAlbumDetailsComponent } from '../song-album-details/song-album-details.component';
import { SongAlbumContentComponent } from '../song-album-content/song-album-content.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AlbumTileLargeSmartModule,
    BaseButtonModule,
    MediaDetailsDropdownModule,
    VirtualTableSmartModule,
    LetDirective,
    ArtistDetailsComponent,
    ArtistDetailsContentComponent,
    SongAlbumDetailsComponent,
    SongAlbumContentComponent,
  ],
  selector: 'musicnya-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDetailsComponent implements AfterViewInit, OnDestroy {
  mediaColor!: FastAverageColorResult | void;
  isArtist = false;

  state$: Observable<any>;
  destroy$ = new Subject<void>();

  constructor(
    public musicAPIFacade: MusicAPIFacade,
    private color: ColorService
  ) {
    this.state$ = this.musicAPIFacade.state$;

    this.musicAPIFacade.type$
      .pipe(
        map((type) => type === 'artists'),
        takeUntil(this.destroy$),
        tap((isArtist) => {
          console.log(isArtist);
        })
      )
      .subscribe((isArtist) => {
        this.isArtist = isArtist;
      });
  }

  ngAfterViewInit(): void {
    this.state$.subscribe(async (media) => {
      // TODO move this to a service
      if (!media.loaded) {
        document.documentElement.style.setProperty(
          '--backgroundColor',
          'var(--backgroundColor)'
        );
        document.documentElement.style.setProperty(
          '--backgroundColorLight',
          'var(--backgroundColorLight)'
        );
      } else if (media.loaded && media) {
        await this.color
          .getAverageColor(
            media?.currentMedia?.attributes?.artwork?.url ||
              media?.currentMedia?.songs?.[0]?.attributes?.artwork?.url
          )
          .then((foundColor) => {
            document.documentElement.style.setProperty(
              '--backgroundColor',
              `${(foundColor as any)?.hex}` ?? 'var(--backgroundColor)'
            );

            const color = new Color(`${(foundColor as any)?.hex}`).to('oklch');

            (color as any).c -= 0.1;

            (color as any).l = 0.905;

            document.documentElement.style.setProperty(
              '--backgroundColorLight',
              color.toString()
            );
          });
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  @HostBinding('style.background') backgroundGradient =
    'radial-gradient(100% 100% at 25rem -2rem, oklch(100% 0 0 / 100%) 0, oklch(100% 0 0 / 70%) 8rem, oklch(20% 0 0) 100%), var(--backgroundColor)';
}
