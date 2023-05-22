import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import {
  getMusicAPIState,
  MusicAPIState,
  MusicAPI_API_FEATURE_KEY,
} from '../reducers/music-api.reducer';

export const getMusicAPI = createFeatureSelector(MusicAPI_API_FEATURE_KEY);

export const getLibraryAlbums = select(
  getMusicAPI,
  (state: MusicAPIState) => state.libraryAlbums
);

export const getLibraryPlaylists = select(
  getMusicAPI,
  (state: MusicAPIState) => state.libraryPlaylists
);

export const getPlaylists = select(
  getMusicAPI,
  (state: MusicAPIState) => state.playlists
);

export const getAlbums = select(
  getMusicAPI,
  (state: MusicAPIState) => state.libraryAlbums
);

export const getLibraryPlaylistSongs = createSelector(
  getMusicAPIState,
  (state: MusicAPIState) => {
    if (state.libraryPlaylists) {
      return {
        ...state.libraryPlaylists.find(
          (playlist) => playlist.id === state.selectedId
        )?.tracks,
      };
    } else {
      return null;
    }
  }
);
