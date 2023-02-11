import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedSongsComponent } from './components/liked-songs/liked-songs.component';

const routes: Routes = [
  {
    path: '',
    component: LikedSongsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
    CommonModule
  ]
})
export class LikedSongsRoutingModule {}