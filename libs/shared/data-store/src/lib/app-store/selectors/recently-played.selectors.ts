import { EntityState } from '@ngrx/entity';
import { createSelector } from '@ngrx/store';
import { MusicKit } from '@nyan-inc/shared-types';

import {
  MusicAPIState,
  recentlyPlayedAdapter,
} from '../reducers/music-api.reducer';
import { selectMusicAPIState } from './music-api.selectors';

export const selectRecentlyPlayed = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState): EntityState<MusicKit.Resource> => state.recentlyPlayed
);

export const {
  selectIds: selectRecentlyPlayedIds,
  selectEntities: selectRecentlyPlayedEntities,
  selectAll: selectAllRecentlyPlayed,
  selectTotal: selectTotalRecentlyPlayed,
} = recentlyPlayedAdapter.getSelectors(selectRecentlyPlayed);
