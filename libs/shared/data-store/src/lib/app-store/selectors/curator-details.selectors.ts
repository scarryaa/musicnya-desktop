import { createSelector } from '@ngrx/store';
import {
  curatorCategoriesAdapter,
  MusicAPIState,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectCuratorCategories = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.curatorCategories
);

export const {
  selectIds: selectCuratorCategoriesIds,
  selectEntities: selectCuratorCategoriesEntities,
  selectAll: selectAllCuratorCategories,
  selectTotal: selectTotalCuratorCategories,
} = curatorCategoriesAdapter.getSelectors(selectCuratorCategories);
