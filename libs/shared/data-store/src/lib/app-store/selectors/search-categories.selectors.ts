import { createSelector } from '@ngrx/store';
import {
  browseCategoriesAdapter,
  MusicAPIState,
  searchCategoriesAdapter,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectSearchCategories = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.searchCategories
);

export const {
  selectIds: selectSearchCategoriesIds,
  selectEntities: selectSearchCategoriesEntities,
  selectAll: selectAllSearchCategories,
  selectTotal: selectTotalSearchCategories,
} = searchCategoriesAdapter.getSelectors(selectSearchCategories);
