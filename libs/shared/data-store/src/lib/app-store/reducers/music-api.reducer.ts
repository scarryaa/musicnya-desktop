import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createReducer,
  on,
  Action,
  createFeatureSelector,
  ActionReducer,
  MetaReducer,
  createSelector,
} from '@ngrx/store';

import { MusicAPIActions } from '../actions';
import { MusicAPIEntity } from '../models/music-api.models';
import { MediaItemTypes } from '@nyan-inc/core';
import { MusicKit } from '../../../types';

export const MUSIC_API_FEATURE_KEY = 'musicApi';
export const RATINGS_FEATURE_KEY = 'ratings';

// state
export interface MusicAPIState {
  selectedId?: string | number;
  loaded: boolean;
  libraryPlaylists: EntityState<MusicKit.LibraryPlaylists>;
  libraryAlbums: EntityState<MusicKit.LibraryAlbums>;
  libraryArtists: EntityState<MusicKit.LibraryArtists>;
  librarySongs: EntityState<MusicKit.LibrarySongs>;
  error?: string | Error | null;

  // caches
  playlistsCache: EntityState<MusicKit.Playlists>;
  albumsCache: EntityState<MusicKit.Albums>;
  songsCache: EntityState<MusicKit.Songs>;
  artistsCache: EntityState<MusicKit.Artists>;
  ratingsCache: EntityState<MusicKit.Ratings>;
  currentMedia?: { data?: MusicKit.MediaItem; type?: MediaItemTypes };
  recentlyPlayed: EntityState<MusicKit.Resource>;
  personalRecommendations: EntityState<MusicKit.PersonalRecommendation>;
}

export interface MusicAPIPartialState {
  readonly [MUSIC_API_FEATURE_KEY]: MusicAPIState;
}

// selectors
export const getMusicAPIState = createFeatureSelector<MusicAPIState>(
  MUSIC_API_FEATURE_KEY
);

export const getRatings = createSelector(
  getMusicAPIState,
  (state: MusicAPIState) => state.ratingsCache
);

// adapters
export const mediaCacheAdapter: EntityAdapter<MusicKit.MediaItem> =
  createEntityAdapter<MusicKit.MediaItem>();
export const ratingsCacheAdapter: EntityAdapter<MusicKit.Ratings> =
  createEntityAdapter<MusicKit.Ratings>();
export const libraryPlaylistsAdapter: EntityAdapter<MusicKit.LibraryPlaylists> =
  createEntityAdapter<MusicKit.LibraryPlaylists>();
export const libraryAlbumsAdapter: EntityAdapter<MusicKit.LibraryAlbums> =
  createEntityAdapter<MusicKit.LibraryAlbums>();
export const libraryArtistsAdapter: EntityAdapter<MusicKit.LibraryArtists> =
  createEntityAdapter<MusicKit.LibraryArtists>();
export const librarySongsAdapter: EntityAdapter<MusicKit.LibrarySongs> =
  createEntityAdapter<MusicKit.LibrarySongs>();
export const homeTileListsAdapter: EntityAdapter<{
  id: string;
  title: string;
  data: MusicKit.Resource[] | MusicKit.PersonalRecommendation[];
}> = createEntityAdapter<{
  id: string;
  title: string;
  data: MusicKit.Resource[] | MusicKit.PersonalRecommendation[];
}>();
export const MusicAPIAdapter: EntityAdapter<MusicAPIEntity> =
  createEntityAdapter<MusicAPIEntity>();
export const recentlyPlayedAdapter: EntityAdapter<MusicKit.Resource> =
  createEntityAdapter<MusicKit.Resource>();
export const personalRecommendationsAdapter: EntityAdapter<MusicKit.PersonalRecommendation> =
  createEntityAdapter<MusicKit.PersonalRecommendation>();
export const playlistsCacheAdapter: EntityAdapter<MusicKit.Playlists> =
  createEntityAdapter<MusicKit.Playlists>();
export const albumsCacheAdapter: EntityAdapter<MusicKit.Albums> =
  createEntityAdapter<MusicKit.Albums>();
export const songsCacheAdapter: EntityAdapter<MusicKit.Songs> =
  createEntityAdapter<MusicKit.Songs>();
export const artistsCacheAdapter: EntityAdapter<MusicKit.Artists> =
  createEntityAdapter<MusicKit.Artists>();

//initial state
export const initialState: MusicAPIState = {
  loaded: false,
  libraryPlaylists: libraryPlaylistsAdapter.getInitialState(),
  libraryAlbums: libraryAlbumsAdapter.getInitialState(),
  libraryArtists: libraryArtistsAdapter.getInitialState(),
  librarySongs: librarySongsAdapter.getInitialState(),
  playlistsCache: playlistsCacheAdapter.getInitialState(),
  albumsCache: albumsCacheAdapter.getInitialState(),
  songsCache: songsCacheAdapter.getInitialState(),
  artistsCache: artistsCacheAdapter.getInitialState(),
  ratingsCache: ratingsCacheAdapter.getInitialState(),
  currentMedia: { data: undefined, type: undefined },
  recentlyPlayed: recentlyPlayedAdapter.getInitialState(),
  personalRecommendations: personalRecommendationsAdapter.getInitialState(),
};

// meta reducers
export const metaReducers: MetaReducer<MusicAPIState>[] = [persistStateReducer];

export function persistStateReducer(_reducer: ActionReducer<MusicAPIState>) {
  const localStorageKey = 'state';
  return (state: MusicAPIState | undefined, action: Action) => {
    if (state === undefined) {
      const persisted = localStorage.getItem(localStorageKey);
      return persisted ? JSON.parse(persisted) : _reducer(state, action);
    }

    const nextState = _reducer(state, action);
    localStorage.setItem(localStorageKey, JSON.stringify(nextState));
    return nextState;
  };
}

// reducers
export function musicAPIReducer(
  state: MusicAPIState | undefined,
  action: Action
) {
  return reducer(state, action);
}

const reducer = createReducer(
  { ...initialState },
  on(MusicAPIActions.loadMusicAPI, (state) => ({
    ...state,
    loaded: false,
  })),
  on(MusicAPIActions.loadMusicAPISuccess, (state) => ({
    ...state,
    loaded: true,
  })),
  on(MusicAPIActions.loadMusicAPIFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  on(MusicAPIActions.getLibraryPlaylists, (state) => ({ ...state })),
  on(MusicAPIActions.getLibraryPlaylistsSuccess, (state, { payload }) => ({
    ...state,
    libraryPlaylists: libraryPlaylistsAdapter.setAll(
      payload.data,
      state.libraryPlaylists
    ),
  })),
  on(MusicAPIActions.getLibraryPlaylistsFailure, (state, { payload }) => ({
    ...state,
    error: payload.error,
  })),

  // set current media
  on(MusicAPIActions.setCurrentMedia, (state, { payload }) => ({
    ...state,
    currentMedia: payload,
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
    libraryPlaylists: libraryPlaylistsAdapter.setOne(
      payload.data,
      state.libraryPlaylists
    ),
  })),
  on(MusicAPIActions.getLibraryPlaylistFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get from url
  on(MusicAPIActions.getFromUrl, (state) => ({ ...state })),
  on(MusicAPIActions.getFromUrlSuccess, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getFromUrlFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // // get media item
  // on(MusicAPIActions.getMediaItem, (state) => ({ ...state, loaded: false })),
  // on(MusicAPIActions.getMediaItemSuccess, (state, { payload }) => ({
  //   ...state,
  //   // add to cache

  // })),
  // on(MusicAPIActions.getMediaItemFailure, (state, { payload }) => ({
  //   ...state,
  //   payload: payload.error,
  // })),

  // set current view type
  on(MusicAPIActions.setCurrentViewType, (state) => ({
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
      recentlyPlayed: recentlyPlayedAdapter.setAll(
        payload.data.recentlyPlayed,
        state.recentlyPlayed
      ),
      personalRecommendations: personalRecommendationsAdapter.setAll(
        payload.data.recommendations,
        state.personalRecommendations
      ),
    })
  ),
  on(
    MusicAPIActions.getRecommendationsAndRecentlyPlayedFailure,
    (state, { payload }) => ({
      ...state,
      payload: payload.error,
    })
  ),

  // get artist from id
  on(MusicAPIActions.getArtist, (state) => ({
    ...state,
    loaded: false,
  })),
  on(MusicAPIActions.getArtistSuccess, (state, { payload }) => ({
    ...state,
    artist: payload.data,
    artistsCache: artistsCacheAdapter.addOne(payload.data, state.artistsCache),
    loaded: true,
  })),
  on(MusicAPIActions.getArtistFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get user ratings from ids
  on(MusicAPIActions.getUserRatingsFromIDs, (state) => ({
    ...state,
    loaded: false,
  })),
  on(MusicAPIActions.getUserRatingsFromIDsSuccess, (state, { payload }) => ({
    ...state,
    ratingsCache: {
      ...state.ratingsCache,
      ...payload.data,
    },
  })),
  on(MusicAPIActions.getUserRatingsFromIDsFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // loved media item
  on(MusicAPIActions.loveMediaItem, (state) => ({
    ...state,
    loaded: false,
  })),
  on(MusicAPIActions.loveMediaItemSuccess, (state, { payload }) => ({
    ...state,
    ratingsCache: {
      ...state.ratingsCache,
      ...payload.data,
    },
  })),
  on(MusicAPIActions.loveMediaItemFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  }))
);
