import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  HostBinding,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlbumTileLargeSmartModule,
  MediaDetailsDropdownModule,
  VirtualTableSmartModule,
} from '@nyan-inc/ui';
import { BaseButtonModule } from '@nyan-inc/core';

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
export class MediaDetailsComponent {
  showAdditionalInfo = false;

  constructor(private changeReference: ChangeDetectorRef) {}

  toggleShowContent() {
    this.showAdditionalInfo = !this.showAdditionalInfo;
    this.changeReference.detectChanges();
  }

  @HostBinding('style.background') backgroundGradient =
    'radial-gradient(100% 100% at 25rem -2rem, oklch(100% 0 0 / 100%) 0, oklch(100% 0 0 / 40%) 8rem, oklch(0 0 0) 100%), teal';
}
