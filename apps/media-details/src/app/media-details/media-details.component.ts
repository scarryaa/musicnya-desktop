import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlbumTileComponent,
  AlbumTileLargeSmartModule,
  MediaDetailsDropdownModule,
  VirtualTableSmartModule,
} from '@nyan-inc/ui';
import { BaseButtonModule, ColorService } from '@nyan-inc/core';
import { FastAverageColorResult } from 'fast-average-color';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    AlbumTileLargeSmartModule,
    BaseButtonModule,
    MediaDetailsDropdownModule,
    VirtualTableSmartModule,
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

  constructor(
    private changeReference: ChangeDetectorRef,
    private color: ColorService
  ) {}

  async ngAfterViewInit(): Promise<void> {
    this.mediaColor = await this.color
      .getAverageColor(
        (this.mediaCover.nativeElement as HTMLElement).getAttribute(
          'imagesource'
        ) ?? ''
      )
      .then((result) => result);

    document.body.style.setProperty(
      '--backgroundColor',
      this.mediaColor?.hex ?? '#000'
    );
    this.changeReference.markForCheck();
  }

  toggleShowContent() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
    this.changeReference.detectChanges();
  }

  @HostBinding('style.background') backgroundGradient =
    'radial-gradient(100% 100% at 25rem -2rem, oklch(100% 0 0 / 100%) 0, oklch(100% 0 0 / 40%) 8rem, oklch(0 0 0) 100%), var(--backgroundColor)';
}
