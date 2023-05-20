import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as MusickitActions from './musickit.actions';
import { MusickitEntity } from './musickit.models';
import {} from '../../types/MusicKit';

export const MUSICKIT_FEATURE_KEY = 'musickit';

export interface MusickitState extends EntityState<MusickitEntity> {
  selectedId?: string | number; // which Musickit record has been selected
  loaded: boolean; // has the Musickit list been loaded
  error?: string | null; // last known error (if any)
  volume: number;
  storefront: string;
  queue: Array<MusicKit.MediaItem>;
  history: Array<MusicKit.MediaItem>;
  queuePosition: number;
  shuffleMode: MusicKit.PlayerShuffleMode;
  repeatMode: MusicKit.PlayerRepeatMode | string;
  currentTrack: MusicKit.MediaItem | null | undefined;
  currentTrackArtworkURL: string;
  currentPlaybackTime: number;
  currentPlaybackDuration: number;
  isPlaying: boolean;
  isPreviewMode: boolean;
  autoplayTracks: boolean;
  playbackState: MusicKit.PlaybackStates | null;
  userPlaylists: MusicKit.LibraryPlaylists[];
}

export interface MusickitPartialState {
  readonly [MUSICKIT_FEATURE_KEY]: MusickitState;
}

export const musickitAdapter: EntityAdapter<MusickitEntity> =
  createEntityAdapter<MusickitEntity>();

export const initialMusickitState: MusickitState =
  musickitAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    initialized: false,
    volume: 0.25,
    storefront: '',
    queue: [],
    history: [],
    queuePosition: 0,
    shuffleMode: 0,
    repeatMode: 'none',
    currentTrack: undefined,
    currentTrackArtworkURL: '',
    currentPlaybackTime: 0,
    currentPlaybackDuration: 0,
    instance: undefined,
    isPlaying: false,
    isPreviewMode: true,
    autoplayTracks: true,
    playbackState: 0,
    userPlaylists: [],
  });

const reducer = createReducer(
  initialMusickitState,
  on(MusickitActions.initMusickit, (state) => ({
    ...state,
    error: undefined,
  })),
  on(MusickitActions.loadMusickitSuccess, (state) => ({
    ...state,
    loaded: true,
  })),
  on(MusickitActions.loadMusickitFailure, (state, { payload: { error } }) => ({
    ...state,
    error: error,
  })),

  on(MusickitActions.addEventListenerSuccess, (state) => ({
    ...state,
  })),
  on(
    MusickitActions.addEventListenerFailure,
    (state, { payload: { error } }) => ({
      ...state,
      error: error,
    })
  ),

  on(MusickitActions.play, (state) => ({
    ...state,
  })),
  on(MusickitActions.playSuccess, (state) => ({
    ...state,
  })),
  on(MusickitActions.playFailure, (state, { payload: { error } }) => ({
    ...state,
    error: error,
  })),

  on(MusickitActions.setQueue, (state) => ({
    ...state,
  })),
  on(MusickitActions.setQueueSuccess, (state) => ({
    ...state,
  })),
  on(MusickitActions.setQueueFailure, (state, { payload: { error } }) => ({
    ...state,
    error: error,
  })),

  on(MusickitActions.getUserPlaylists, (state) => ({
    ...state,
  })),
  on(
    MusickitActions.getUserPlaylistsSuccess,
    (state, { payload: { data } }) => ({
      ...state,
      userPlaylists: data,
    })
  ),
  on(
    MusickitActions.getUserPlaylistsFailure,
    (state, { payload: { error } }) => ({
      ...state,
      error: error,
    })
  )
);

export function musickitReducer(
  state: MusickitState | undefined,
  action: Action
) {
  return reducer(state, action);
}
