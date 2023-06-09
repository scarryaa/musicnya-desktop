import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingComponent, MediaTileListComponent } from '@nyan-inc/ui';
import { MusicAPIFacade, MusicFacade } from '@nyan-inc/shared';
import { LetDirective } from '@ngrx/component';

@Component({
  selector: 'library-library-playlists',
  standalone: true,
  imports: [
    CommonModule,
    HeadingComponent,
    MediaTileListComponent,
    LetDirective,
  ],
  templateUrl: './library-playlists.component.html',
  styleUrls: ['./library-playlists.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPlaylistsComponent {
  constructor(public vm: MusicAPIFacade, public music: MusicFacade) {}

  play(type: string, id: string) {
    this.music.setQueueThenPlay(type, id);
  }
}
