import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MusicKit } from '@nyan-inc/musickit';
import { MusicAPIActions } from '../actions';
import { MusicAPIState } from '../reducers/music-api.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIFacade {
  libraryPlaylists$ = this.store.select(
    (state: MusicAPIState) => state.libraryPlaylists
  );

  constructor(private store: Store<MusicAPIState>) {}

  init(config: MusicKit.MusicKitConfiguration) {
    this.store.dispatch(MusicAPIActions.init({ payload: { config: config } }));
  }

  getLibraryPlaylistSongs(id: number) {
    this.store.dispatch(
      MusicAPIActions.getLibraryPlaylistSongs({ payload: { id } })
    );
  }

  getLibraryPlaylists() {
    this.store.dispatch(MusicAPIActions.getLibraryPlaylists());
  }
}
