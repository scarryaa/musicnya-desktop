import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirtualTableModule, VirtualTableSmartModule } from '@nyan-inc/ui';
import { Observable, Subject } from 'rxjs';
import { MusicFacade, MusicAPIFacade } from '@nyan-inc/shared';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'musicnya-song-album-content',
  standalone: true,
  imports: [
    CommonModule,
    VirtualTableSmartModule,
    VirtualTableModule,
    LetDirective,
  ],
  templateUrl: './song-album-content.component.html',
  styleUrls: ['./song-album-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SongAlbumContentComponent {
  musicState$: MusicFacade;
  state$: Observable<any>;
  readonly routeChangeEmitter = new Subject<void>();

  constructor(
    private musicAPIFacade: MusicAPIFacade,
    private musicFacade: MusicFacade
  ) {
    this.state$ = this.musicAPIFacade.state$;
    this.musicState$ = this.musicFacade;
  }
}
