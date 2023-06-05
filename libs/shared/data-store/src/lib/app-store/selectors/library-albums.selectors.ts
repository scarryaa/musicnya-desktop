import { createSelector } from '@ngrx/store';
import {
  libraryAlbumsAdapter,
  MusicAPIState,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectLibraryAlbums = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.libraryAlbums
);

export const {
  selectIds: selectLibraryAlbumIds,
  selectEntities: selectLibraryAlbumEntities,
  selectAll: selectAllLibraryAlbums,
  selectTotal: selectLibraryAlbumsTotal,
} = libraryAlbumsAdapter.getSelectors(selectLibraryAlbums);
