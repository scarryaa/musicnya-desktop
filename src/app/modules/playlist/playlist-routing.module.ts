import { CommonModule } from '@angular/common';
import { inject, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeactivateGuard } from './components/playlist/deactivate.guard';
import { PlaylistComponent } from './components/playlist/playlist.component';

const routes: Routes = [
  {
    path: ':id',
    component: PlaylistComponent,
    // canDeactivate: [(component: PlaylistComponent) => component.resetHeaderOpacity()]
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
export class PlaylistRoutingModule {}