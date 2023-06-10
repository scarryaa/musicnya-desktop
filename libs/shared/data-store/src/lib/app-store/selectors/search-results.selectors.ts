import { createSelector } from '@ngrx/store';
import {
  MusicAPIState,
  searchResultsAdapter,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';
import { MusicKit } from '@nyan-inc/shared-types';

export const selectSearchResults = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.searchResults
);

export const {
  selectEntities: selectSearchResultsEntities,
  selectAll: selectAllSearchResults,
  selectTotal: selectTotalSearchResults,
} = searchResultsAdapter.getSelectors(selectSearchResults);

export const selectSearchResultsIds = (state: MusicAPIState) => {
  return selectAllSearchResults(
    (result: MusicKit.TermSuggestion | MusicKit.TopResultSuggestion) =>
      result?.content?.id
  );
};
