import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LikedSongsComponent } from './components/liked-songs/liked-songs.component';
import { LikedSongsRoutingModule } from './liked-songs-routing.module';

@NgModule({
  declarations: [
    LikedSongsComponent
  ],
  imports: [
    CommonModule,
    LikedSongsRoutingModule
  ]
})
export class LikedSongsModule { }
