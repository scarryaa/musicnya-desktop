import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterModule, PlaybackControlsModule } from '@nyan-inc/ui';
import { LetDirective } from '@ngrx/component';
import { MusicFacade } from '@nyan-inc/shared';
import { AlbumTileModule } from '@nyan-inc/core';

@Component({
  selector: 'musicnya-footer',
  standalone: true,
  imports: [
    CommonModule,
    FooterModule,
    AlbumTileModule,
    PlaybackControlsModule,
    LetDirective,
  ],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(public playerFacade: MusicFacade) {}
}
