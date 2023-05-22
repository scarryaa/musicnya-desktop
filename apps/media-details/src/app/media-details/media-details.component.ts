import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlbumTileComponent,
  AlbumTileLargeSmartModule,
  MediaDetailsDropdownModule,
  VirtualTableSmartModule,
} from '@nyan-inc/ui';
import {
  adjustColor,
  Album,
  BaseButtonModule,
  ColorService,
  LibraryAlbum,
  LibraryPlaylist,
  Playlist,
} from '@nyan-inc/core';
import { FastAverageColorResult } from 'fast-average-color';
import { MusicAPIFacade } from '@nyan-inc/shared';
import { map, Observable } from 'rxjs';
import { LetDirective } from '@ngrx/component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AlbumTileLargeSmartModule,
    BaseButtonModule,
    MediaDetailsDropdownModule,
    VirtualTableSmartModule,
    LetDirective,
  ],
  selector: 'musicnya-media-details',
  templateUrl: './media-details.component.html',
  styleUrls: ['./media-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MediaDetailsComponent implements AfterViewInit {
  showAdditionalInfo = false;
  @ViewChild('mediaCover', { read: ElementRef })
  mediaCover!: ElementRef;
  mediaColor!: FastAverageColorResult | void;
  state$: Observable<any>;

  constructor(
    private changeReference: ChangeDetectorRef,
    private musicAPIFacade: MusicAPIFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
  }

  async ngAfterViewInit(): Promise<void> {
    this.state$.subscribe((media) => {
      if (!media.loaded) {
        // TODO move this to a service
        document.documentElement.style.setProperty(
          '--backgroundColor',
          '#151515'
        );
      } else if (media) {
        document.documentElement.style.setProperty(
          '--backgroundColor',
          media?.currentMedia?.artwork?.dominantColor ??
            'var(--backgroundColor)'
        );
      }
    });
  }

  toggleShowContent() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
    this.changeReference.detectChanges();
  }

  @HostBinding('style.background') backgroundGradient =
    'radial-gradient(100% 100% at 25rem -2rem, oklch(100% 0 0 / 100%) 0, oklch(100% 0 0 / 70%) 8rem, oklch(20% 0 0) 100%), var(--backgroundColor)';
}
