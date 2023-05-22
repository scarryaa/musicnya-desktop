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
  currentMedia$: Observable<
    LibraryPlaylist | Playlist | Album | LibraryAlbum | undefined
  >;

  constructor(
    private changeReference: ChangeDetectorRef,
    private musicAPIFacade: MusicAPIFacade
  ) {
    this.currentMedia$ = this.musicAPIFacade.currentMedia$;
  }

  async ngAfterViewInit(): Promise<void> {
    this.changeReference.markForCheck();
    this.currentMedia$.subscribe((media) => {
      if (media) {
        document.documentElement.style.setProperty(
          '--backgroundColor',
          media?.artwork?.dominantColor ?? 'var(--backgroundColor)'
        );
      }
    });
  }

  toggleShowContent() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
    this.changeReference.detectChanges();
  }

  @HostBinding('style.background') backgroundGradient =
    'radial-gradient(100% 100% at 25rem -2rem, oklch(100% 0 0 / 100%) 0, oklch(100% 0 0 / 40%) 8rem, oklch(0 0 0) 100%), var(--backgroundColor)';
}
