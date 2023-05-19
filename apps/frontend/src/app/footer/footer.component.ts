import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AlbumTileModule,
  FooterModule,
  PlaybackControlsModule,
} from '@nyan-inc/ui';

@Component({
  selector: 'musicnya-footer',
  standalone: true,
  imports: [
    CommonModule,
    FooterModule,
    AlbumTileModule,
    PlaybackControlsModule,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
