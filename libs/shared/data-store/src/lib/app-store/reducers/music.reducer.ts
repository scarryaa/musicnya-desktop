import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createReducer,
  on,
  Action,
  createSelector,
  createFeatureSelector,
} from '@ngrx/store';
import { MusicKit } from '@nyan-inc/shared-types';
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
  isLiveStream: boolean | undefined;
  isBuffering: boolean | undefined;
  isWaiting: boolean | undefined;
  isSeeking: boolean | undefined;
  isStalled: boolean | undefined;
  playbackBitrate: number | undefined;
  playbackVolume: number | undefined;
  currentArtist: MusicKit.Resource | undefined;
  currentItem: MusicKit.MediaItem | undefined;
  currentQueue: MusicKit.Queue | undefined;
  currentQueueIndex: number | undefined;
  currentQueueItems: MusicKit.MediaItem[] | undefined;
  currentQueueDuration: number | undefined;
  currentPlaybackDuration: number | undefined;
  currentPlaybackTimeRemaining: number | undefined;
  currentPlaybackTime: number | undefined;
  currentPlaybackShuffleMode: MusicKit.PlayerShuffleMode | undefined;
  currentPlaybackRepeatMode: MusicKit.PlayerRepeatMode | undefined;
  currentPlaybackState: MusicKit.PlaybackStates;
  currentPlaybackBufferedProgress: number | undefined;
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
  error: undefined,
  mediaCache: [],
  currentMediaType: undefined,
  currentMedia: undefined,
  homeTileLists: [],
  musicPlayer: {
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    isLiveStream: undefined,
    isBuffering: undefined,
    isWaiting: undefined,
    isSeeking: undefined,
    isStalled: undefined,
    playbackBitrate: undefined,
    playbackVolume: undefined,
    currentArtist: undefined,
    currentItem: undefined,
    currentQueue: undefined,
    currentQueueIndex: undefined,
    currentQueueItems: undefined,
    currentQueueDuration: undefined,
    currentPlaybackDuration: undefined,
    currentPlaybackTimeRemaining: undefined,
    currentPlaybackTime: undefined,
    currentPlaybackShuffleMode: undefined,
    currentPlaybackRepeatMode: undefined,
    currentPlaybackState: 0,
    currentPlaybackBufferedProgress: undefined,
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

  on(MusicActions.setQueue, (state) => ({
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

  on(MusicActions.setQueueThenPlay, (state) => ({
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
    musicPlayer: {
      ...state.musicPlayer,
      currentPlaybackVolume: volume,
    },
  })),
  on(MusicActions.setVolumeSuccess, (state) => ({
    ...state,
  })),
  on(MusicActions.setVolumeFailure, (state, { payload: { error } }) => ({
    ...state,
    loaded: false,
    error: error,
  })),

  on(MusicActions.setQueueFromSongIDs, (state) => ({
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
  })),

  // get artist from song id
  on(MusicActions.getArtistFromSongID, (state) => ({ ...state })),
  on(MusicActions.getArtistFromSongIDSuccess, (state, { payload }) => ({
    ...state,
    musicPlayer: {
      ...state.musicPlayer,
      currentArtist: payload.data,
    },
  })),
  on(MusicActions.getArtistFromSongIDFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
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

export const getCurrentArtist = createSelector(
  selectMusicState,
  (state) => state.musicPlayer.currentArtist
);

export const getMusicState =
  createFeatureSelector<MusicState>(MUSIC_FEATURE_KEY);

export function musicReducer(state: MusicState | undefined, action: Action) {
  return reducer(state, action);
}
