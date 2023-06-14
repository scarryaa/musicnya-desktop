import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import {
  createReducer,
  on,
  Action,
  ActionReducer,
  MetaReducer,
} from '@ngrx/store';

import { MusicAPIActions } from '../actions';
import { MusicAPIEntity } from '../models/music-api.models';
import { MusicKit } from '@nyan-inc/shared-types';

export const MUSIC_API_FEATURE_KEY = 'musicApi';
export const RATINGS_FEATURE_KEY = 'ratings';

// state
export interface MusicAPIState extends EntityState<MusicAPIEntity> {
  selectedId?: string | number;
  loaded: boolean;
  libraryPlaylists: EntityState<MusicKit.LibraryPlaylists>;
  libraryAlbums: EntityState<MusicKit.LibraryAlbums>;
  libraryArtists: EntityState<MusicKit.LibraryArtists>;
  librarySongs: EntityState<MusicKit.LibrarySongs>;
  error?: string | Error | null;

  // caches
  playlists: EntityState<MusicKit.Playlists>;
  albums: EntityState<MusicKit.Albums>;
  songs: EntityState<MusicKit.Songs>;
  artists: EntityState<MusicKit.Artists>;
  ratings: EntityState<MusicKit.Ratings>;
  currentMedia?: { data?: MusicKit.MediaItem; type?: MusicKit.MediaItemType };
  recentlyPlayed: EntityState<MusicKit.Resource>;
  personalRecommendations: EntityState<MusicKit.PersonalRecommendation>;
  browseCategories: EntityState<MusicKit.Groupings>;
  radioCategories: EntityState<MusicKit.Groupings>;
  curatorCategories: EntityState<MusicKit.Groupings>;
  searchCategories: EntityState<MusicKit.PersonalRecommendation>;
  searchResults: EntityState<
    MusicKit.TopResultSuggestion | MusicKit.TermSuggestion
  >;
  searchTerms: string;
  searchHints: EntityState<string>;
}

export interface MusicAPIPartialState {
  readonly [MUSIC_API_FEATURE_KEY]: MusicAPIState;
}

// adapters
export const mediaCacheAdapter: EntityAdapter<MusicKit.MediaItem> =
  createEntityAdapter<MusicKit.MediaItem>();
export const ratingsAdapter: EntityAdapter<MusicKit.Ratings> =
  createEntityAdapter<MusicKit.Ratings>();
export const libraryPlaylistsAdapter: EntityAdapter<MusicKit.LibraryPlaylists> =
  createEntityAdapter<MusicKit.LibraryPlaylists>({});
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
export const playlistsAdapter: EntityAdapter<MusicKit.Playlists> =
  createEntityAdapter<MusicKit.Playlists>();
export const albumsAdapter: EntityAdapter<MusicKit.Albums> =
  createEntityAdapter<MusicKit.Albums>();
export const songsAdapter: EntityAdapter<MusicKit.Songs> =
  createEntityAdapter<MusicKit.Songs>();
export const artistsAdapter: EntityAdapter<MusicKit.Artists> =
  createEntityAdapter<MusicKit.Artists>();
export const browseCategoriesAdapter: EntityAdapter<MusicKit.Groupings> =
  createEntityAdapter<MusicKit.Groupings>();
export const radioCategoriesAdapter: EntityAdapter<MusicKit.Groupings> =
  createEntityAdapter<MusicKit.Groupings>();
export const curatorCategoriesAdapter: EntityAdapter<MusicKit.Groupings> =
  createEntityAdapter<MusicKit.Groupings>();
export const searchCategoriesAdapter: EntityAdapter<MusicKit.PersonalRecommendation> =
  createEntityAdapter<MusicKit.PersonalRecommendation>();
export const searchResultsAdapter: EntityAdapter<
  MusicKit.TopResultSuggestion | MusicKit.TermSuggestion
> = createEntityAdapter({
  selectId: (
    suggestion: MusicKit.TopResultSuggestion | MusicKit.TermSuggestion
  ) => suggestion.content?.id || suggestion.content?.name,
});
export const searchHintsAdapter: EntityAdapter<string> =
  createEntityAdapter<string>();
export const likesAdapter: EntityAdapter<MusicKit.Ratings> =
  createEntityAdapter<MusicKit.Ratings>();

//initial state
export const initialState: MusicAPIState = {
  selectedId: undefined,
  ids: [],
  entities: {},
  loaded: false,
  libraryPlaylists: libraryPlaylistsAdapter.getInitialState(),
  libraryAlbums: libraryAlbumsAdapter.getInitialState(),
  libraryArtists: libraryArtistsAdapter.getInitialState(),
  librarySongs: librarySongsAdapter.getInitialState(),
  playlists: playlistsAdapter.getInitialState(),
  albums: albumsAdapter.getInitialState(),
  songs: songsAdapter.getInitialState(),
  artists: artistsAdapter.getInitialState(),
  ratings: ratingsAdapter.getInitialState(),
  currentMedia: { data: undefined, type: undefined },
  recentlyPlayed: recentlyPlayedAdapter.getInitialState(),
  personalRecommendations: personalRecommendationsAdapter.getInitialState(),
  browseCategories: browseCategoriesAdapter.getInitialState(),
  radioCategories: radioCategoriesAdapter.getInitialState(),
  curatorCategories: curatorCategoriesAdapter.getInitialState(),
  searchCategories: searchCategoriesAdapter.getInitialState(),
  searchResults: searchResultsAdapter.getInitialState(),
  searchHints: searchHintsAdapter.getInitialState(),
  searchTerms: '',
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
    loaded: false,
  })),
  on(MusicAPIActions.setCurrentMediaSuccess, (state) => ({
    ...state,
    loaded: true,
  })),
  on(MusicAPIActions.setCurrentMediaFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
    loaded: true,
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

  // set loading
  on(MusicAPIActions.setLoading, (state, { payload }) => ({
    ...state,
    loaded: payload.loading,
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

  // get media item on route change
  on(MusicAPIActions.getMediaItemOnRouteChange, (state) => ({
    ...state,
    loaded: false,
  })),
  on(
    MusicAPIActions.getMediaItemOnRouteChangeSuccess,
    (state, { payload }) => ({
      ...state,
      loaded: true,
    })
  ),
  on(
    MusicAPIActions.getMediaItemOnRouteChangeFailure,
    (state, { payload }) => ({
      ...state,
      payload: payload.error,
    })
  ),

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

  // get personal recommendations
  on(MusicAPIActions.getRecommendations, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getRecommendationsSuccess, (state, { payload }) => ({
    ...state,
    personalRecommendations: personalRecommendationsAdapter.setAll(
      payload.data,
      state.personalRecommendations
    ),
  })),
  on(MusicAPIActions.getRecommendationsFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get media likes
  on(MusicAPIActions.getItemLikes, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getItemLikesSuccess, (state, { payload }) => ({
    ...state,
    ratings: ratingsAdapter.setAll(payload.items, state.ratings),
  })),
  on(MusicAPIActions.getItemLikesFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get recently played
  on(MusicAPIActions.getRecentlyPlayed, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getRecentlyPlayedSuccess, (state, { payload }) => ({
    ...state,
    recentlyPlayed: recentlyPlayedAdapter.setAll(
      payload.data,
      state.recentlyPlayed
    ),
  })),
  on(MusicAPIActions.getRecentlyPlayedFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get browse categories
  on(MusicAPIActions.getBrowseCategories, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getBrowseCategoriesSuccess, (state, { payload }) => ({
    ...state,
    browseCategories: browseCategoriesAdapter.setAll(
      payload.data,
      state.browseCategories
    ),
  })),
  on(MusicAPIActions.getBrowseCategoriesFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get radio categories
  on(MusicAPIActions.getRadioCategories, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getRadioCategoriesSuccess, (state, { payload }) => ({
    ...state,
    radioCategories: radioCategoriesAdapter.setAll(
      payload.data,
      state.radioCategories
    ),
  })),
  on(MusicAPIActions.getRadioCategoriesFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get curator categories
  on(MusicAPIActions.getCuratorCategories, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getCuratorCategoriesSuccess, (state, { payload }) => ({
    ...state,
    curatorCategories: curatorCategoriesAdapter.setAll(
      payload.data,
      state.curatorCategories
    ),
  })),
  on(MusicAPIActions.getCuratorCategoriesFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get search categories
  on(MusicAPIActions.getSearchCategories, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.getSearchCategoriesSuccess, (state, { payload }) => ({
    ...state,
    searchCategories: searchCategoriesAdapter.setAll(
      payload.data,
      state.searchCategories
    ),
  })),
  on(MusicAPIActions.getSearchCategoriesFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get search results
  on(MusicAPIActions.search, (state) => ({
    ...state,
  })),
  on(MusicAPIActions.searchSuccess, (state, { payload }) => ({
    ...state,
    searchResults: searchResultsAdapter.setAll(
      payload.data,
      state.searchResults
    ),
  })),
  on(MusicAPIActions.searchFailure, (state, { payload }) => ({
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

  // get album
  on(MusicAPIActions.getAlbum, (state) => ({
    ...state,
    loaded: false,
  })),
  on(MusicAPIActions.getAlbumSuccess, (state, { payload }) => ({
    ...state,
    albums: albumsAdapter.setOne(payload.data, state.albums),
    loaded: true,
  })),
  on(MusicAPIActions.getAlbumFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // get artist from id
  on(MusicAPIActions.getArtist, (state) => ({
    ...state,
    loaded: false,
  })),
  on(MusicAPIActions.getArtistSuccess, (state, { payload }) => ({
    ...state,
    artist: payload.data,
    artists: artistsAdapter.addOne(payload.data, state.artists),
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
    ratings: {
      ...state.ratings,
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
    ratings: ratingsAdapter.addOne(payload.data[0], state.ratings),
  })),
  on(MusicAPIActions.loveMediaItemFailure, (state, { payload }) => ({
    ...state,
    payload: payload.error,
  })),

  // Unloved media item
  on(MusicAPIActions.unloveMediaItem, (state) => ({
    ...state,
    loaded: false,
  })),
  on(MusicAPIActions.unloveMediaItemSuccess, (state, { payload }) => ({
    ...state,
    ratings: ratingsAdapter.removeOne(payload.data[0].id, state.ratings),
  }))
);
