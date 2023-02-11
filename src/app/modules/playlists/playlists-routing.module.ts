import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistComponent } from './components/playlist/playlist.component';

const routes: Routes = [
  {
    path: ':id',
    component: PlaylistComponent,
  },
  {
    path: '',
    component: PlaylistComponent
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
export class PlaylistsRoutingModule {}