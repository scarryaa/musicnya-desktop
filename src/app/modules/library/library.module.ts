import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { LibraryRoutingModule } from './library-routing.module';

@NgModule({
  declarations: [
    PlaylistsComponent,
  ],
  imports: [
    CommonModule,
    LibraryRoutingModule
  ]
})
export class LibraryModule { }
  //TODO fix slider performance issues when on this page
  //TODO preserve back/forward button state (e.g. which filter is selected, if any)
