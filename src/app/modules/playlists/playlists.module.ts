import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistComponent } from './components/playlist/playlist.component';
import { PlaylistsRoutingModule } from './playlists-routing.module';



@NgModule({
  declarations: [
    PlaylistComponent
  ],
  imports: [
    CommonModule,
    PlaylistsRoutingModule
  ]
})
export class PlaylistsModule { }
