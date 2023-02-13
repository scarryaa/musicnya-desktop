import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { FallbackSrc } from 'src/app/directives/fallback-src.directive';
import { MinSecPipe } from 'src/app/pipes/min-sec.pipe';
import { SongPipe } from 'src/app/pipes/song.pipe';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    PlaylistComponent,
    FallbackSrc,
    MinSecPipe,
    SongPipe,
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class PlaylistsModule { }
