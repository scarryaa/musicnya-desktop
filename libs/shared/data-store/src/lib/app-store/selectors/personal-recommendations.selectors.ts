import { createSelector } from '@ngrx/store';
import {
  MusicAPIState,
  personalRecommendationsAdapter,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectPersonalRecommendations = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.personalRecommendations
);

export const {
  selectIds: selectPersonalRecommendationsIds,
  selectEntities: selectPersonalRecommendationsEntities,
  selectAll: selectAllPersonalRecommendations,
  selectTotal: selectTotalPersonalRecommendations,
} = personalRecommendationsAdapter.getSelectors(selectPersonalRecommendations);
