import { createSelector } from '@ngrx/store';
import { MusicAPIState, playlistsAdapter } from '../reducers/music-api.reducer';
import { selectMusicAPIState, selectSelectedId } from './music-api.selectors';

export const selectPlaylists = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.playlists
);

export const {
  selectIds: selectPlaylistIds,
  selectEntities: selectPlaylistEntities,
  selectAll: selectAllPlaylists,
  selectTotal: selectPlaylistTotal,
} = playlistsAdapter.getSelectors(selectPlaylists);

export const selectPlaylistSongs = createSelector(
  selectPlaylistEntities,
  selectSelectedId,
  (entities, selectedId) => {
    return selectedId ? entities[selectedId]?.relationships?.tracks?.data : [];
  }
);
