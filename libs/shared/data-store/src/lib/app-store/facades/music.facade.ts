/* eslint-disable functional/prefer-immutable-types */
import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription, tap } from 'rxjs';
import { ReadonlyDeep } from 'type-fest';
import { MusicKit } from '../../../types';
import { processMediaType } from '../../models/helpers';
import { MusicActions } from '../actions';
import { fromMusic } from '../reducers';
import { MusicState } from '../reducers/music.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicFacade implements OnDestroy {
  readonly subs = new Subscription();
  readonly state$ = this.store.pipe(select(fromMusic.getMusicState));
  readonly currentItem$ = this.state$.pipe(
    select(fromMusic.getCurrentItem)
  ) as Observable<MusicKit.MediaItem>;
  readonly playing$ = this.state$.pipe(select(fromMusic.getPlaying));
  readonly volume$ = this.state$.pipe(
    map((state) => state.musicPlayer.playbackVolume)
  );
  readonly paused$ = this.state$.pipe(
    map((state) => state.musicPlayer.isPaused)
  );
  readonly repeatMode$ = this.state$.pipe(
    map((state) => state.musicPlayer.currentPlaybackRepeatMode)
  );
  readonly shuffleMode$ = this.state$.pipe(
    map((state) => state.musicPlayer.currentPlaybackShuffleMode)
  );
  readonly duration$ = this.state$.pipe(
    map((state) => state.musicPlayer.currentPlaybackDuration)
  );
  readonly currentPlaybackTime$ = this.state$.pipe(
    select(fromMusic.getCurrentPlaybackTime)
  );
  readonly currentPlaybackState$ = this.state$.pipe(
    select(fromMusic.getCurrentPlaybackState)
  );
  readonly currentArtist$ = this.state$.pipe(
    map((state) => state.musicPlayer.currentArtist)
  );

  constructor(private readonly store: Store<MusicState>) {}

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  getMusicState() {
    return this.state$;
  }

  play() {
    this.store.dispatch(MusicActions.play());
  }

  pause() {
    this.store.dispatch(MusicActions.pause());
  }

  seekToTime(time: Readonly<number>) {
    this.store.dispatch(MusicActions.seekToTime({ payload: { time } }));
  }

  setVolume(volume: Readonly<number>) {
    this.store.dispatch(MusicActions.setVolume({ payload: { volume } }));
  }

  setQueue(type: Readonly<string>, id: Readonly<string>) {
    type = processMediaType(type, id);

    this.store.dispatch(
      MusicActions.setQueue({
        payload: { options: { [type]: id, startPlaying: false } },
      })
    );
  }

  setQueueThenPlay(type: string, id: string) {
    type = processMediaType(type, id);

    this.store.dispatch(
      MusicActions.setQueueThenPlay({
        payload: { options: { [type]: id, startPlaying: true } },
      })
    );
  }

  setQueueAndPlayAtIndex(type: string, id: string, index = 0) {
    type = processMediaType(type, id);

    this.store.dispatch(
      MusicActions.setQueueThenPlay({
        payload: {
          options: { [type]: id, startWith: index, startPlaying: true },
        },
      })
    );
  }

  shufflePlay(type: Readonly<string>, id: Readonly<string>) {
    type = processMediaType(type, id);

    this.store.dispatch(
      MusicActions.shufflePlay({
        payload: { options: { [type]: id, startPlaying: false } },
      })
    );
  }

  setQueuePosition(position: Readonly<number>) {
    this.store.dispatch(
      MusicActions.setQueuePosition({ payload: { position } })
    );
  }

  setRepeatMode() {
    this.store.dispatch(MusicActions.setRepeatMode());
  }

  setShuffleMode() {
    this.store.dispatch(MusicActions.setShuffleMode());
  }

  previousTrack() {
    this.store.dispatch(MusicActions.skipToPreviousItem());
  }

  nextTrack() {
    this.store.dispatch(MusicActions.skipToNextItem());
  }

  changeToMediaAtIndex(index: Readonly<number>) {
    this.store.dispatch(
      MusicActions.changeToMediaAtIndex({ payload: { index } })
    );
  }

  addEventListener(event: ReadonlyDeep<string>, callback: ReadonlyDeep<any>) {
    this.store.dispatch(
      MusicActions.addEventListener({ payload: { event, callback } })
    );
  }

  removeEventListener(event: Readonly<string>, callback: any) {
    this.store.dispatch(
      MusicActions.removeEventListener({ payload: { event, callback } })
    );
  }

  setQueueFromMediaItems(mediaItems: MusicKit.MediaItem[]) {
    this.store.dispatch(
      MusicActions.setQueueFromMediaItems({ payload: { items: mediaItems } })
    );
  }

  setQueueFromSongIDs(ids: string[]) {
    this.store.dispatch(MusicActions.setQueueFromSongIDs({ payload: { ids } }));
  }
}
