import { Injectable, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { LibraryPlaylist } from '@nyan-inc/core';
import { map, Observable } from 'rxjs';
import { MusicKit } from 'types/musickit';
import { MusicAPIActions } from '../actions';
import { fromMusicAPI } from '../reducers';
import { MusicAPIState } from '../reducers/music-api.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIFacade {
  libraryPlaylists$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.libraryPlaylists));
  currentMedia$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.currentMedia));
  loaded$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.loaded));
  state$ = this.store.pipe(select(fromMusicAPI.getMusicAPIState));

  constructor(private store: Store<MusicAPIState>) {}

  init(config: MusicKit.MusicKitConfiguration) {
    this.store.dispatch(MusicAPIActions.init({ payload: { config: config } }));
  }

  getLibraryPlaylists() {
    this.store.dispatch(MusicAPIActions.getLibraryPlaylists());
  }
}
