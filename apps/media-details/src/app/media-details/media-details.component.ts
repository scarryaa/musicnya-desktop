import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlbumTileLargeSmartModule,
  MediaDetailsDropdownModule,
  VirtualTableSmartModule,
} from '@nyan-inc/ui';
import { BaseButtonModule, ColorService } from '@nyan-inc/core';
import { FastAverageColorResult } from 'fast-average-color';
import { MusicAPIFacade, MusicFacade, RouterFacade } from '@nyan-inc/shared';
import { Observable, Subject, takeUntil } from 'rxjs';
import { LetDirective } from '@ngrx/component';
import Color from 'colorjs.io';

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
export class MediaDetailsComponent implements AfterViewInit, OnDestroy {
  showAdditionalInfo = false;
  @ViewChild('mediaCover', { read: ElementRef })
  mediaCover!: ElementRef;
  mediaColor!: FastAverageColorResult | void;
  state$: Observable<any>;
  musicState$: MusicFacade;
  destroy$ = new Subject<void>();

  readonly routeChangeEmitter = new Subject<void>();

  constructor(
    private changeReference: ChangeDetectorRef,
    private musicAPIFacade: MusicAPIFacade,
    private musicFacade: MusicFacade,
    private routerFacade: RouterFacade,
    private color: ColorService
  ) {
    this.state$ = this.musicAPIFacade.state$;
    this.musicState$ = this.musicFacade;
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

  toggleShowContent() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
    this.changeReference.detectChanges();
  }

  @HostBinding('style.background') backgroundGradient =
    'radial-gradient(100% 100% at 25rem -2rem, oklch(100% 0 0 / 100%) 0, oklch(100% 0 0 / 70%) 8rem, oklch(20% 0 0) 100%), var(--backgroundColor)';
}
