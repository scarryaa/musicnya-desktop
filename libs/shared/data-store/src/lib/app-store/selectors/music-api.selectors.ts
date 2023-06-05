import { createFeatureSelector, createSelector, select } from '@ngrx/store';
import {
  MusicAPIState,
  MUSIC_API_FEATURE_KEY,
} from '../reducers/music-api.reducer';
import { MusicAPIEntity } from 'libs/shared/data-store/src/lib/app-store/models/music-api.models';
import { createEntityAdapter } from '@ngrx/entity';

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
