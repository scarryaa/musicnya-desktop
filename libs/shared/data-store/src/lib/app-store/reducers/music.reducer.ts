import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createReducer,
  on,
  Action,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { MediaItemTypes } from '@nyan-inc/core';
import type { MusicKit } from '../../../types';
import { MKMediaItemType } from '../../models/musickit.models';
import { MusicActions } from '../actions';

import { MusicEntity } from '../models/music.models';

export const MUSIC_FEATURE_KEY = 'music';

export interface MusicState extends EntityState<MusicEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null | Error;
  musicPlayer: MusicPlayerState;
}

interface MusicPlayerState {
  isPlaying: boolean;
  isPaused: boolean;
  isStopped: boolean;
  isLiveStream: boolean | null;
  isBuffering: boolean | null;
  isWaiting: boolean | null;
  isSeeking: boolean | null;
  isStalled: boolean | null;
  playbackBitrate: number | null;
  playbackVolume: number | null;
  currentItem: MusicKit.MediaItem;
  currentQueue: MusicKit.Queue | null;
  currentQueueIndex: number | null;
  currentQueueItems: MusicKit.MediaItem[] | null;
  currentQueueDuration: number | null;
  currentPlaybackDuration: number | null;
  currentPlaybackTimeRemaining: number | null;
  currentPlaybackTime: number | null;
  currentPlaybackShuffleMode: MusicKit.PlayerShuffleMode | null;
  currentPlaybackRepeatMode: MusicKit.PlayerRepeatMode | null;
  currentPlaybackState: MusicKit.PlaybackStates;
  currentPlaybackBufferedProgress: number | null;
}

export interface MusicPartialState {
  readonly [MUSIC_FEATURE_KEY]: MusicState;
}

export const musicAdapter: EntityAdapter<MusicEntity> =
  createEntityAdapter<MusicEntity>();

export const initialMusicState: MusicState = musicAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  libraryPlaylists: [],
  error: null,
  mediaCache: [],
  currentMediaType: null,
  currentMedia: null,
  homeTileLists: [],
  musicPlayer: {
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isLiveStream: null,
    isBuffering: null,
    isWaiting: null,
    isSeeking: null,
    isStalled: null,
    playbackBitrate: null,
    playbackVolume: null,
    currentItem: {
      href: '',
      id: '',
      type: MKMediaItemType.songs as unknown as MusicKit.MediaItemType,
    },
    currentQueue: null,
    currentQueueIndex: null,
    currentQueueItems: null,
    currentQueueDuration: null,
    currentPlaybackDuration: null,
    currentPlaybackTimeRemaining: null,
    currentPlaybackTime: null,
    currentPlaybackShuffleMode: null,
    currentPlaybackRepeatMode: null,
    currentPlaybackState: 0,
    currentPlaybackBufferedProgress: null,
  },
});

// event listeners

const reducer = createReducer(
  { ...initialMusicState },
  on(MusicActions.musicInit, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),

  on(MusicActions.addEventListener, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.addEventListenerSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.addEventListenerFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: true,
    error: error,
  })),

  on(MusicActions.removeEventListener, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.removeEventListenerSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(
    MusicActions.removeEventListenerFailure,
    (state, { payload: { error } }) => ({
      ...state,
      loaded: false,
      error: error,
    })
  ),

  on(MusicActions.skipToPreviousItem, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.skipToPreviousItemSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(
    MusicActions.skipToPreviousItemFailure,
    (state, { payload: { error } }) => ({
      ...state,
      loaded: false,
      error: error,
    })
  ),

  on(MusicActions.skipToNextItem, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.skipToNextItemSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.skipToNextItemFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.changeToMediaAtIndex, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.changeToMediaAtIndexSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(
    MusicActions.changeToMediaAtIndexFailure,
    (state, { payload: { error } }) => ({
      ...state,
      loaded: false,
      error: error,
    })
  ),

  on(MusicActions.play, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.playSuccess, (state) => ({
    ...state,
    loaded: true,
    musicPlayer: {
      ...state.musicPlayer,
      isPlaying: true,
      isPaused: false,
      isStopped: false,
    },
    error: undefined,
  })),
  on(MusicActions.playFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.pause, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.pauseSuccess, (state) => ({
    ...state,
    loaded: true,
    musicPlayer: {
      ...state.musicPlayer,
      isPlaying: false,
      isPaused: true,
      isStopped: false,
    },
    error: undefined,
  })),
  on(MusicActions.pauseFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.seekToTime, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicActions.seekToTimeSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.seekToTimeFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setQueuePosition, (state, { payload: { position } }) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
      currentQueueIndex: position,
    },
  })),
  on(MusicActions.setQueuePositionSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.setQueuePositionFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setQueue, (state, { payload: { options } }) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
    },
  })),
  on(MusicActions.setQueueSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.setQueueFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setQueueThenPlay, (state, { payload: { options } }) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
    },
  })),
  on(MusicActions.setQueueThenPlaySuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.setQueueThenPlayFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.shufflePlay, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
      currentPlaybackShuffleMode: 1,
    },
  })),
  on(MusicActions.shufflePlaySuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.shufflePlayFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setRepeatMode, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
    },
  })),
  on(
    MusicActions.setRepeatModeSuccess,
    (state, { payload: { repeatMode } }) => ({
      ...state,
      loaded: true,
      error: undefined,
      musicPlayer: {
        ...state.musicPlayer,
        currentPlaybackRepeatMode: repeatMode,
      },
    })
  ),
  on(MusicActions.setRepeatModeFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setShuffleMode, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
    },
  })),
  on(
    MusicActions.setShuffleModeSuccess,
    (state, { payload: { shuffleMode } }) => ({
      ...state,
      loaded: true,
      error: undefined,
      currentPlaybackShuffleMode: shuffleMode,
    })
  ),
  on(MusicActions.setShuffleModeFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setVolume, (state, { payload: { volume } }) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
      currentPlaybackVolume: volume,
    },
  })),
  on(MusicActions.setVolumeSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.setVolumeFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setQueueFromSongIDs, (state, { payload: { ids } }) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
    },
  })),
  on(MusicActions.setQueueFromSongIDsSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(
    MusicActions.setQueueFromSongIDsFailure,
    (state, { payload: { error } }) => ({
      ...state,
      loaded: false,
      error: error,
    })
  ),

  on(MusicActions.setPlaybackTime, (state, { payload: { time } }) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
      currentPlaybackTime: time,
    },
  })),
  on(MusicActions.setPlaybackTimeSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.setPlaybackTimeFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(
    MusicActions.setPlaybackDuration,
    (state, { payload: { playbackDuration } }) => ({
      ...state,
      loaded: false,
      error: undefined,
      musicPlayer: {
        ...state.musicPlayer,
        currentPlaybackDuration: playbackDuration,
      },
    })
  ),
  on(MusicActions.setPlaybackDurationSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(
    MusicActions.setPlaybackDurationFailure,
    (state, { payload: { error } }) => ({
      ...state,
      loaded: false,
      error: error,
    })
  ),

  on(MusicActions.setMediaItem, (state, { payload: { mediaItem } }) => ({
    ...state,
    loaded: false,
    error: undefined,
    musicPlayer: {
      ...state.musicPlayer,
      currentItem: mediaItem,
    },
  })),
  on(MusicActions.setMediaItemSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.setMediaItemFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(
    MusicActions.setPlaybackState,
    (state, { payload: { playbackState } }) => ({
      ...state,
      loaded: false,
      error: undefined,
      musicPlayer: {
        ...state.musicPlayer,
        currentPlaybackState: playbackState,
      },
    })
  ),
  on(MusicActions.setPlaybackStateSuccess, (state) => ({
    ...state,
    loaded: true,
    error: undefined,
  })),
  on(MusicActions.setPlaybackStateFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  }))
);

export const selectMusicState = (state: MusicState) => state;

export const getPlaying = createSelector(
  selectMusicState,
  (state) => state.musicPlayer.isPlaying
);

export const getCurrentItem = createSelector(
  selectMusicState,
  (state) => state.musicPlayer.currentItem
);

export const getCurrentPlaybackTime = createSelector(
  selectMusicState,
  (state) => state.musicPlayer?.currentPlaybackTime
);

export const getCurrentPlaybackState = createSelector(
  selectMusicState,
  (state) => state.musicPlayer?.currentPlaybackState
);

export const getMusicState =
  createFeatureSelector<MusicState>(MUSIC_FEATURE_KEY);

export function musicReducer(state: MusicState | undefined, action: Action) {
  return reducer(state, action);
}

let setAll = (obj: any, val: any) =>
  Object.keys(obj).forEach((k) => (obj[k] = val));
let setNull = (obj: any) => setAll(obj, null);
