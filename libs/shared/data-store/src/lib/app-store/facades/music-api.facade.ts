import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { filter, map, Subscription, take } from 'rxjs';
import { MusicKit } from 'types/musickit';
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
  loaded$ = this.store
    .pipe(select(fromMusicAPI.getMusicAPIState))
    .pipe(map((value) => value.loaded));
  state$ = this.store.pipe(select(fromMusicAPI.getMusicAPIState));

  constructor(private store: Store<MusicAPIState>) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  init(config: MusicKit.MusicKitConfiguration) {
    this.store.dispatch(MusicAPIActions.init({ payload: { config: config } }));
  }

  getRecommendations() {
    this.subs.add(
      this.state$
        .pipe(filter((state) => state.musickitLoaded))
        .subscribe(() =>
          this.store.dispatch(MusicAPIActions.getRecommendations())
        )
    );
  }

  getRecommendationsAndRecentlyPlayed() {
    this.subs.add(
      this.state$
        .pipe(
          filter((state) => state.musickitLoaded),
          take(1)
        )
        .subscribe(() =>
          this.store.dispatch(
            MusicAPIActions.getRecommendationsAndRecentlyPlayed()
          )
        )
    );
  }
}
