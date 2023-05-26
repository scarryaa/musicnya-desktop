import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import copy, { State } from 'fast-copy';
import { MusicAPIActions } from '../actions';
import { MusicAPIEntity } from '../models/music-api.models';
import {
  Albums,
  LibraryAlbums,
  LibraryPlaylists,
  MediaItem,
  MediaItemTypes,
  PersonalRecommendation,
  Playlists,
  Resource,
} from '@nyan-inc/core';

export const MusicAPI_API_FEATURE_KEY = 'musicApi';

export interface MusicAPIState extends EntityState<MusicAPIEntity> {
  selectedId?: string | number;
  loaded: boolean;
  musickitLoaded: boolean;
  libraryPlaylists: LibraryPlaylists[] | undefined;
  error?: string | Error | null;
  mediaCache?: MediaItem[];
  currentMediaType?: MediaItemTypes;
  currentMedia?: Resource;
  homeTileLists: Array<{
    title: string;
    data?: Resource[] | PersonalRecommendation[];
  }>;
}

export function persistStateReducer(_reducer: ActionReducer<State>) {
  const localStorageKey = 'state';
  return (state: State | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }

    const nextState = _reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

export const metaReducers: MetaReducer<any>[] = [persistStateReducer];

export interface MusicAPIPartialState {
  readonly [MusicAPI_API_FEATURE_KEY]: MusicAPIState;
}

export const MusicAPIAdapter: EntityAdapter<MusicAPIEntity> =
  createEntityAdapter<MusicAPIEntity>();

export const initialMusicAPIState: MusicAPIState =
  MusicAPIAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    musickitLoaded: false,
    libraryPlaylists: undefined,
    libraryAlbums: undefined,
    playlists: undefined,
    albums: undefined,
    mediaCache: undefined,
    currentMedia: undefined,
    currentMediaType: undefined,
    homeTileLists: [
      {
        data: [{ id: '', type: 'library-playlists', href: '' }],
        title: 'eeeee',
      },
    ],
  });

const reducer = createReducer(
  { ...initialMusicAPIState },
  on(MusicAPIActions.init, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicAPIActions.initSuccess, (state) =>
    MusicAPIAdapter.setMany([], {
      ...state,
      loaded: true,
      musickitLoaded: true,
    })
  ),
  on(MusicAPIActions.initFailure, (state) => ({ ...state })),

  on(MusicAPIActions.getLibraryPlaylists, (state) => ({ ...state })),
  on(MusicAPIActions.getLibraryPlaylistsSuccess, (state, { payload }) => ({
    ...state,
    libraryPlaylists: copy(payload.data),
  })),
  on(MusicAPIActions.getLibraryPlaylistsFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  // set current media
  on(MusicAPIActions.setCurrentMedia, (state, { payload }) => ({
    ...state,
    currentMedia: payload.data,
    loaded: true,
  })),
  on(MusicAPIActions.setCurrentMediaSuccess, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.setCurrentMediaFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  on(MusicAPIActions.getLibraryPlaylistSongs, (state) => ({ ...state })),
  on(MusicAPIActions.getLibraryPlaylistSongsSuccess, (state, { payload }) => ({
    ...state,
    libraryPlaylist: {
      ...payload.playlist,
      songs: payload.songs,
    },
  })),
  on(MusicAPIActions.getLibraryPlaylistSongsFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get library item on navigation
  on(MusicAPIActions.getLibraryPlaylist, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getLibraryPlaylistSuccess, (state, { payload }) => ({
    ...state,
    currentMedia: payload.data,
  })),
  on(MusicAPIActions.getLibraryPlaylistFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get from url
  on(MusicAPIActions.getFromUrl, (state) => ({ ...state })),
  on(MusicAPIActions.getFromUrlSuccess, (state, { payload }) => ({
    ...state,
  })),
  on(MusicAPIActions.getFromUrlFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get media item
  on(MusicAPIActions.getMediaItem, (state) => ({ ...state, loaded: false })),
  on(MusicAPIActions.getMediaItemSuccess, (state, { payload }) => ({
    ...state,
    mediaCache: [
      ...(state.mediaCache ?? Array.prototype.concat(payload.data)),
      payload.data,
    ],
  })),
  on(MusicAPIActions.getMediaItemFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // set current view type
  on(MusicAPIActions.setCurrentViewType, (state, { payload }) => ({
    ...state,
  })),
  on(MusicAPIActions.setCurrentViewTypeSuccess, (state, { payload }) => ({
    ...state,
    currentMediaType: payload.type,
  })),
  on(MusicAPIActions.setCurrentViewTypeFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // set recommendations and recently played
  on(MusicAPIActions.getRecommendationsAndRecentlyPlayed, (state) => ({
    ...state,
  })),
  on(
    MusicAPIActions.getRecommendationsAndRecentlyPlayedSuccess,
    (state, { payload }) => ({
      ...state,
      homeTileLists: [
        { title: 'Recommendations', data: payload.data.recommendations },
        { title: 'Recently Played', data: payload.data.recentlyPlayed },
      ],
    })
  ),
  on(
    MusicAPIActions.getRecommendationsAndRecentlyPlayedFailure,
    (state, { payload }) => ({
      ...state,
      payload: payload.error,
    })
  )
);

export const getMusicAPIState = createFeatureSelector<MusicAPIState>(
  MusicAPI_API_FEATURE_KEY
);

export function musicAPIReducer(
  state: MusicAPIState | undefined,
  action: Action
) {
  return reducer(state, action);
}
