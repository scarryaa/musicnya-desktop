import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import {
  MusicAPIState,
  MUSIC_API_FEATURE_KEY,
} from '../reducers/music-api.reducer';
import { createEntityAdapter } from '@ngrx/entity';
import { MusicAPIEntity } from '../models';

export const selectMusicAPIState = createFeatureSelector<MusicAPIState>(
  MUSIC_API_FEATURE_KEY
);

export const { selectIds, selectEntities, selectAll, selectTotal } =
  createEntityAdapter<MusicAPIEntity>().getSelectors(selectMusicAPIState);

export const selectSelectedId = createSelector(
  selectMusicAPIState,
  (state: MusicAPIState) => state.selectedId
);

export const getMusicAPI = createFeatureSelector(MUSIC_API_FEATURE_KEY);

export const getMediaCache = select(
  getMusicAPI,
  (state: MusicAPIState) => state
);
