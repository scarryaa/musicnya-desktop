import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MusickitBase } from '@yan-inc/core-services';
import { MusicKit } from '../../types';
import { MusicActions } from './actions';
import { MusicState } from './reducers/music.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicEventListeners {
  music = inject(MusickitBase);
  store = inject(Store<MusicState>);
  instance = this.music.instance;

  addEventListeners() {
    console.log('test');

    // add event listeners
    this.instance.addEventListener('playbackTimeDidChange', (event: number) => {
      this.store.dispatch(
        MusicActions.setPlaybackTime({ payload: { time: event } })
      );
    });

    this.instance.addEventListener('mediaItemDidChange', () => {
      if (this.instance.nowPlayingItem) {
        this.store.dispatch(
          MusicActions.setMediaItem({
            payload: {
              mediaItem: this.instance
                .nowPlayingItem as unknown as MusicKit.MediaItem,
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
        MusicActions.setPlaybackState({ payload: event.state })
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
