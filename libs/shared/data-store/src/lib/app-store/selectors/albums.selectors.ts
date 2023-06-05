import { createSelector } from '@ngrx/store';
import { albumsAdapter, MusicAPIState } from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectAlbums = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.albums
);

export const {
  selectIds: selectAlbumIds,
  selectEntities: selectAlbumEntities,
  selectAll: selectAllAlbums,
  selectTotal: selectAlbumsTotal,
} = albumsAdapter.getSelectors(selectAlbums);
