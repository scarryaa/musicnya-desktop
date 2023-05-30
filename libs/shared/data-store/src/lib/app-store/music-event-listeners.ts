import { Inject, inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MusickitBase } from '@nyan-inc/core-services';
import copy from 'fast-copy';
import { Observable, throttleTime } from 'rxjs';
import { MusicKit } from '../../types';
import { MusicActions } from './actions';
import { MusicState } from './reducers/music.reducer';

@Injectable({
  providedIn: 'root',
  deps: [MusickitBase, Store],
})
export class MusicEventListeners {
  store: Store<MusicState>;
  instance: any;
  playbackTimeDidChange$!: Observable<any>;

  constructor(store: Store<MusicState>) {
    this.store = store;
  }

  addEventListeners(instance: any) {
    this.instance = instance;
    this.playbackTimeDidChange$ = createPlaybackTimeDidChangeObservable(
      this.instance
    );
    console.log('Adding event listeners');
    this.playbackTimeDidChange$
      .pipe(throttleTime(100))
      .subscribe((event: any) => {
        this.store.dispatch(
          MusicActions.setPlaybackTime({ payload: { time: event } })
        );
      });

    instance.addEventListener('nowPlayingItemDidChange', () => {
      if (this.instance.nowPlayingItem) {
        this.store.dispatch(
          MusicActions.setMediaItem({
            payload: {
              mediaItem: JSON.parse(
                JSON.stringify(this.instance.nowPlayingItem)
              ),
            },
          })
        );
      }
    });

    this.instance.addEventListener('playbackVolumeDidChange', (event: any) => {
      if (this.instance.volume !== this.instance.volume) {
        this.store.dispatch(
          MusicActions.setVolume({ payload: { volume: this.instance.volume } })
        );
      }
    });

    this.instance.addEventListener('playbackStateDidChange', (event: any) => {
      this.store.dispatch(
        MusicActions.setPlaybackState({
          payload: { playbackState: processPlaybackState(event.state) },
        })
      );
    });

    // instance.addEventListener('queueItemsDidChange', (event: Event) => {
    //   store.dispatch(MusicActions.setQueueItems({ payload: event }));
    // });

    // instance.addEventListener('queuePositionDidChange', (event: Event) => {
    //   store.dispatch(MusicActions.setQueuePosition({ payload: event }));
    // });

    // instance.addEventListener('queueDidChange', (event: Event) => {
    //   store.dispatch(MusicActions.setQueue({ payload: event }));
    // });

    this.instance.addEventListener(
      'playbackDurationDidChange',
      (event: number) => {
        if (
          this.instance.currentPlaybackDuration !==
          this.instance.currentPlaybackDuration
        ) {
          this.store.dispatch(
            MusicActions.setPlaybackDuration({
              payload: {
                playbackDuration: this.instance.currentPlaybackDuration,
              },
            })
          );
        }
      }
    );

    // instance.addEventListener('playbackTargetDidChange', (event: Event) => {
    //   store.dispatch(MusicActions.setPlaybackTarget({ payload: event }));
    // });

    // instance.addEventListener('playbackBitrateDidChange', (event: Event) => {
    //   store.dispatch(MusicActions.setPlaybackBitrate({ payload: event }));
    // });

    // instance.addEventListener('storefrontCountryCodeDidChange', (event: Event) => {
    //   store.dispatch(MusicActions.setStorefrontCountryCode({ payload: event }));
    // });

    // instance.addEventListener('authorizationStatusDidChange', (event: Event) => {
    //   store.dispatch(MusicActions.setAuthorized({ payload: event }));
    // });
  }
}

function createPlaybackTimeDidChangeObservable(instance: any) {
  return new Observable((subscriber) => {
    const handler = (event: number) => subscriber.next(event);

    instance.addEventListener('playbackTimeDidChange', handler);

    return () => instance.removeEventListener('playbackTimeDidChange', handler);
  });
}

const processPlaybackState = (state: any) => {
  switch (state) {
    case MusicKit.PlaybackStates.none:
      return 0;
    case MusicKit.PlaybackStates.loading:
      return 1;
    case MusicKit.PlaybackStates.playing:
      return 2;
    case MusicKit.PlaybackStates.paused:
      return 3;
    case MusicKit.PlaybackStates.stopped:
      return 4;
    case MusicKit.PlaybackStates.seeking:
      return 5;
    case MusicKit.PlaybackStates.waiting:
      return 6;
    case MusicKit.PlaybackStates.stalled:
      return 7;
    case MusicKit.PlaybackStates.completed:
      return 8;
    default:
      return 0;
  }
};
