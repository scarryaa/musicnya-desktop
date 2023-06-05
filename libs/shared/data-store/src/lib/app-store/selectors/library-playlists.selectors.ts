import { createSelector } from '@ngrx/store';
import {
  libraryPlaylistsAdapter,
  MusicAPIState,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState, selectSelectedId } from './music-api.selectors';

export const selectLibraryPlaylists = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.libraryPlaylists
);

export const {
  selectIds: selectLibraryPlaylistIds,
  selectEntities: selectLibraryPlaylistEntities,
  selectAll: selectAllLibraryPlaylists,
  selectTotal: selectLibraryPlaylistTotal,
} = libraryPlaylistsAdapter.getSelectors(selectLibraryPlaylists);

export const selectLibraryPlaylistSongs = createSelector(
  selectLibraryPlaylistEntities,
  selectSelectedId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId]?.relationships?.tracks?.data : [];
  }
);
