import { createSelector } from '@ngrx/store';
import {
  browseCategoriesAdapter,
  MusicAPIState,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectRadioCategories = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.radioCategories
);

export const {
  selectIds: selectRadioCategoriesIds,
  selectEntities: selectRadioCategoriesEntities,
  selectAll: selectAllRadioCategories,
  selectTotal: selectTotalRadioCategories,
} = browseCategoriesAdapter.getSelectors(selectRadioCategories);
