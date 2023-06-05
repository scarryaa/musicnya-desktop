import { createSelector, select } from '@ngrx/store';
import { MusicAPIState, ratingsAdapter } from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const getRatings = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.ratings
);

export const selectAllRatings = createSelector(
  (state: MusicAPIState) => state.ratings,
  ratingsAdapter.getSelectors().selectAll
);
