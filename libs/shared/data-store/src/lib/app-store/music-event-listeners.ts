import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MusickitBase } from '@nyan-inc/core-services';
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
  instance!: MusicKit.MusicKitInstance;
  playbackTimeDidChange$!: Observable<any>;

  constructor(store: Store<MusicState>) {
    this.store = store;
  }

  addEventListeners() {
    console.log('Adding event listeners');
    this.instance = (window as any).MusicKit;
    this.playbackTimeDidChange$ = createPlaybackTimeDidChangeObservable(
      this.instance
    );
    this.playbackTimeDidChange$
      .pipe(throttleTime(100))
      .subscribe((event: any) => {
        this.store.dispatch(
          MusicActions.setPlaybackTime({ payload: { time: event } })
        );
      });

    this.instance.addEventListener('nowPlayingItemDidChange', () => {
      if (this.instance.nowPlayingItem) {
        const item = {
          ...this.instance.nowPlayingItem,
          attributes: {
            ...this.instance.nowPlayingItem.attributes,
            artwork: {
              ...this.instance.nowPlayingItem.artwork,
              url: this.instance.nowPlayingItem.artwork?.url
                ?.replace('{w}x{h}', '100x100')
                .replace('{f}', 'webp'),
            },
          },
        };

        this.store.dispatch(
          MusicActions.setMediaItem({
            payload: {
              mediaItem: JSON.parse(JSON.stringify(item)),
            },
          })
        );

        this.store.dispatch(
          MusicActions.getArtistFromSongID({
            payload: {
              songId: this.instance.nowPlayingItem.id,
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
    case MusicKit.PlaybackStates.none: {
      return 0;
    }
    case MusicKit.PlaybackStates.loading: {
      return 1;
    }
    case MusicKit.PlaybackStates.playing: {
      return 2;
    }
    case MusicKit.PlaybackStates.paused: {
      return 3;
    }
    case MusicKit.PlaybackStates.stopped: {
      return 4;
    }
    case MusicKit.PlaybackStates.seeking: {
      return 5;
    }
    case MusicKit.PlaybackStates.waiting: {
      return 6;
    }
    case MusicKit.PlaybackStates.stalled: {
      return 7;
    }
    case MusicKit.PlaybackStates.completed: {
      return 8;
    }
    default: {
      return 0;
    }
  }
};
