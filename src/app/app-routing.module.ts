import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule)},
  { path: 'search', loadChildren: () => import('./modules/search/search.module').then(m => m.SearchModule)},
  { path: 'library', loadChildren: () => import('./modules/library/library.module').then(m => m.LibraryModule)},
  { path: 'liked_songs', loadChildren: () => import('./modules/liked-songs/liked-songs.module').then(m => m.LikedSongsModule)},
  { path: 'profile', loadComponent: () => import('./modules/core/components/profile/profile.component').then(c => c.ProfileComponent)},
  { path: 'playlist', loadChildren: () => import('./modules/playlist/playlist.module').then(m => m.PlaylistModule)},
  { path: 'settings', loadChildren: () => import('./modules/core/core.module').then(m => m.CoreModule)},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
