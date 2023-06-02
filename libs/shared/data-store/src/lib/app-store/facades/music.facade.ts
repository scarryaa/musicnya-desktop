import { Injectable, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { MusicKit } from '../../../types';
import { processMediaType } from '../../models/helpers';
import { MusicActions } from '../actions';
import { fromMusic } from '../reducers';
import { MusicState, selectMusicState } from '../reducers/music.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicFacade implements OnDestroy {
  subs = new Subscription();
  state$ = this.store.pipe(select(fromMusic.getMusicState));
  currentItem$ = this.state$.pipe(
    select(fromMusic.getCurrentItem)
  ) as Observable<MusicKit.MediaItem>;
  playing$ = this.state$.pipe(select(fromMusic.getPlaying));
  volume$ = this.state$.pipe(map((state) => state.musicPlayer.playbackVolume));
  paused$ = this.state$.pipe(map((state) => state.musicPlayer.isPaused));
  repeatMode$ = this.state$.pipe(
    map((state) => state.musicPlayer.currentPlaybackRepeatMode)
  );
  shuffleMode$ = this.state$.pipe(
    map((state) => state.musicPlayer.currentPlaybackShuffleMode)
  );
  duration$ = this.state$.pipe(
    map((state) => state.musicPlayer.currentPlaybackDuration)
  );
  currentPlaybackTime$ = this.state$.pipe(
    select(fromMusic.getCurrentPlaybackTime)
  );
  currentPlaybackState$ = this.state$.pipe(
    select(fromMusic.getCurrentPlaybackState)
  );

  constructor(private store: Store<MusicState>) {}

  ngOnDestroy(): void {
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

  seekToTime(time: number) {
    this.store.dispatch(MusicActions.seekToTime({ payload: { time } }));
  }

  setVolume(volume: number) {
    this.store.dispatch(MusicActions.setVolume({ payload: { volume } }));
  }

  setQueue(type: string, id: string) {
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

  shufflePlay(type: string, id: string) {
    type = processMediaType(type, id);

    this.store.dispatch(
      MusicActions.shufflePlay({
        payload: { options: { [type]: id, startPlaying: false } },
      })
    );
  }

  setQueuePosition(position: number) {
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

  changeToMediaAtIndex(index: number) {
    this.store.dispatch(
      MusicActions.changeToMediaAtIndex({ payload: { index } })
    );
  }

  addEventListener(event: string, callback: any) {
    this.store.dispatch(
      MusicActions.addEventListener({ payload: { event, callback } })
    );
  }

  removeEventListener(event: string, callback: any) {
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
