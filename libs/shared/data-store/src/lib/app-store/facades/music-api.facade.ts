import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, skipWhile, Subscription, take } from 'rxjs';
import { MusicAPIActions } from '../actions';
import { fromMusicAPI } from '../reducers';
import { MusicAPIState } from '../reducers/music-api.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicAPIFacade implements OnDestroy {
  subs = new Subscription();
  libraryPlaylists$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.libraryPlaylists));
  currentMedia$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.currentMedia));
  musickitLoaded$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.loaded));
  recommendations$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.homeTileLists[1]));
  recentlyPlayed$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.homeTileLists[0]));
  state$ = this.store.pipe(select(fromMusicAPI.getMusicAPIState));

  constructor(private store: Store<MusicAPIState>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loadAPI() {
    this.store.dispatch(MusicAPIActions.loadMusicAPI());
  }

  getRecommendations() {
    this.subs.add(
      this.state$.subscribe(() =>
        this.store.dispatch(MusicAPIActions.getRecommendations())
      )
    );
  }

  getRecommendationsAndRecentlyPlayed() {
    this.musickitLoaded$
      .pipe(
        skipWhile((loaded) => loaded !== true),
        take(1)
      )
      .subscribe(() =>
        this.store.dispatch(
          MusicAPIActions.getRecommendationsAndRecentlyPlayed()
        )
      );
  }

  getLibraryPlaylists() {
    this.musickitLoaded$
      .pipe(
        skipWhile((loaded) => loaded !== true),
        take(1)
      )
      .subscribe(() =>
        this.store.dispatch(MusicAPIActions.getLibraryPlaylists())
      );
  }
}
