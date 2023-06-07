import { createSelector } from '@ngrx/store';
import {
  browseCategoriesAdapter,
  MusicAPIState,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectBrowseCategories = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.browseCategories
);

export const {
  selectIds: selectBrowseCategoriesIds,
  selectEntities: selectBrowseCategoriesEntities,
  selectAll: selectAllBrowseCategories,
  selectTotal: selectTotalBrowseCategories,
} = browseCategoriesAdapter.getSelectors(selectBrowseCategories);
