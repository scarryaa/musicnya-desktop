import { Injectable, inject } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as MusickitActions from './musickit.actions';
import * as MusickitSelectors from './musickit.selectors';

@Injectable({ providedIn: 'root' })
export class MusickitFacade {
  constructor(private store: Store) {}

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(MusickitSelectors.selectMusickitLoaded));
  userPlaylists$ = this.store.pipe(
    select(MusickitSelectors.selectUserPlaylists)
  );
  allMusickit$ = this.store.pipe(select(MusickitSelectors.selectAllMusickit));
  selectedMusickit$ = this.store.pipe(select(MusickitSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init(config: MusicKit.MusicKitConfiguration) {
    this.store.dispatch(MusickitActions.initMusickit({ payload: { config } }));
  }

  addEventListener(event: any, callback: Function) {
    this.store.dispatch(
      MusickitActions.addEventListener({ payload: { event, callback } })
    );
  }

  play() {
    this.store.dispatch(MusickitActions.play());
  }

  setQueue(options: MusicKit.QueueOptions) {
    this.store.dispatch(MusickitActions.setQueue({ payload: { options } }));
  }

  getUserPlaylists() {
    this.store.dispatch(MusickitActions.getUserPlaylists());
  }
}
