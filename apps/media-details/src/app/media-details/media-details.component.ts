import {
  Component,
  ChangeDetectionStrategy,
  HostBinding,
  AfterViewInit,
  OnDestroy,
  AfterContentInit,
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
import { Subject, takeUntil } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import Color from 'colorjs.io';
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
    SongAlbumDetailsComponent,
    SongAlbumContentComponent,
  ],
  selector: 'musicnya-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDetailsComponent implements AfterContentInit, OnDestroy {
  readonly mediaColor!: FastAverageColorResult | void;
  readonly isArtist = false;

  readonly destroy$: Subject<void> = new Subject<void>();

  constructor(
    public readonly musicAPIFacade: MusicAPIFacade,
    private readonly color: ColorService
  ) {}

  ngAfterContentInit() {
    this.musicAPIFacade.state$
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (media): Promise<any> => {
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
              media?.currentMedia?.data?.attributes?.['artwork']?.url ||
                media?.currentMedia?.data?.songs?.[0]?.attributes?.['artwork']
                  ?.url
            )
            .then((foundColor: FastAverageColorResult | void) => {
              document.documentElement.style.setProperty(
                '--backgroundColor',
                `${(foundColor as any)?.hex}` ?? 'var(--backgroundColor)'
              );

              const color: Color = new Color(`${(foundColor as any)?.hex}`).to(
                'oklch'
              );

              const newColor: any = {
                ...color,
                c: (color as any).c - 0.1,
                l: 0.905,
              };

              document.documentElement.style.setProperty(
                '--backgroundColorLight',
                newColor.toString()
              );
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
