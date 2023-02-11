import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaylistsComponent } from './components/playlists/playlists.component';

const routes: Routes = [
  {
    path: '',
    component: PlaylistsComponent
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
export class LibraryRoutingModule {}