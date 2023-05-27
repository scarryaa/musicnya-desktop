import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action, createSelector } from '@ngrx/store';
import type { MusicKit } from '../../../types';
import { MusicActions } from '../actions';

import { MusicEntity } from '../models/music.models';

export const MUSIC_FEATURE_KEY = 'music';

export interface MusicState extends EntityState<MusicEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
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
  currentItem: MusicKit.MediaItem | null;
  currentQueue: MusicKit.Queue | null;
  currentQueueIndex: number | null;
  currentQueueItems: MusicKit.MediaItem[] | null;
  currentQueueDuration: number | null;
  currentPlaybackDuration: number | null;
  currentPlaybackTimeRemaining: number | null;
  currentPlaybackTime: number | null;
  currentPlaybackShuffleMode: MusicKit.PlayerRepeatMode | null;
  currentPlaybackRepeatMode: MusicKit.PlayerRepeatMode | null;
  currentPlaybackState: MusicKit.PlaybackStates | null;
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
    currentItem: null,
    currentQueue: null,
    currentQueueIndex: null,
    currentQueueItems: null,
    currentQueueDuration: null,
    currentPlaybackDuration: null,
    currentPlaybackTimeRemaining: null,
    currentPlaybackTime: null,
    currentPlaybackShuffleMode: null,
    currentPlaybackRepeatMode: null,
    currentPlaybackState: null,
    currentPlaybackBufferedProgress: null,
  },
});

const reducer = createReducer(
  { ...initialMusicState },
  on(MusicActions.musicInit, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  }))
);

export const selectMusicState = (state: MusicState) => state;

export const getPlaying = createSelector(
  selectMusicState,
  (state) => state.musicPlayer.isPlaying
);

export const getMediaLoaded = createSelector(
  selectMusicState,
  (state) => state.musicPlayer?.currentItem
);

export function musicReducer(state: MusicState | undefined, action: Action) {
  return reducer(state, action);
}
