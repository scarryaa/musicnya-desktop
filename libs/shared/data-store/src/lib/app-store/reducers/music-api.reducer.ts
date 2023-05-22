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
import { Album, LibraryAlbum, LibraryPlaylist, Playlist } from '@nyan-inc/core';

export const MusicAPI_API_FEATURE_KEY = 'MusicAPI';

export interface MusicAPIState extends EntityState<MusicAPIEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | Error | null;
  libraryPlaylists: LibraryPlaylist[] | undefined;
  playlists: Playlist[] | undefined;
  libraryAlbums: LibraryAlbum[] | undefined;
  albums: Album[] | undefined;
  currentMedia: LibraryPlaylist | LibraryAlbum | Album | Playlist | undefined;
}

export function persistStateReducer(_reducer: ActionReducer<State>) {
  const localStorageKey = MusicAPI_API_FEATURE_KEY;
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
    libraryPlaylists: undefined,
    libraryAlbums: undefined,
    playlists: undefined,
    albums: undefined,
    currentMedia: undefined,
  });

const reducer = createReducer(
  { ...initialMusicAPIState },
  on(AppActions.initApp, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),
  on(MusicAPIActions.initSuccess, (state) =>
    MusicAPIAdapter.setMany([], { ...state, loaded: true })
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

  // get playlist
  on(MusicAPIActions.getPlaylist, (state) => ({ ...state })),
  on(MusicAPIActions.getPlaylistSuccess, (state, { payload }) => ({
    ...state,
    playlists: {
      ...state.playlists!,
      [payload.data.id]: payload.data,
    },
  })),
  on(MusicAPIActions.getPlaylistFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  // set current media
  on(MusicAPIActions.setCurrentMedia, (state, { payload }) => ({
    ...state,
    currentMedia: payload.data,
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
    libraryPlaylist: payload.playlist,
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
    currentMedia: payload.data,
    loaded: true,
  })),
  on(MusicAPIActions.getMediaItemFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  }))
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
