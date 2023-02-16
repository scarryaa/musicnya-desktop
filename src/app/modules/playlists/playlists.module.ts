import { NgModule } from '@angular/core';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { FallbackSrc } from 'src/app/directives/fallback-src.directive';
import { MinSecPipe } from 'src/app/pipes/min-sec.pipe';
import { SongPipe } from 'src/app/pipes/song.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '../core/core.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TableVirtualScrollModule } from 'ng-table-virtual-scroll';

@NgModule({
  declarations: [
    PlaylistComponent,
    MinSecPipe,
    SongPipe
  ],
  imports: [
    PlaylistsRoutingModule,
    MatIconModule,
    MatButtonModule,
    CoreModule,
    ScrollingModule,
    TableVirtualScrollModule,
    FallbackSrc
  ]
})
export class PlaylistsModule { }
