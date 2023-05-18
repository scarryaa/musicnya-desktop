import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MUSICKIT_FEATURE_KEY,
  MusickitState,
  musickitAdapter,
} from './musickit.reducer';

// Lookup the 'Musickit' feature state managed by NgRx
export const selectMusickitState =
  createFeatureSelector<MusickitState>(MUSICKIT_FEATURE_KEY);

const { selectAll, selectEntities } = musickitAdapter.getSelectors();

export const selectMusickitLoaded = createSelector(
  selectMusickitState,
  (state: MusickitState) => state.loaded
);

export const selectMusickitError = createSelector(
  selectMusickitState,
  (state: MusickitState) => state.error
);

export const selectAllMusickit = createSelector(
  selectMusickitState,
  (state: MusickitState) => selectAll(state)
);

export const selectMusickitEntities = createSelector(
  selectMusickitState,
  (state: MusickitState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectMusickitState,
  (state: MusickitState) => state.selectedId
);

export const selectEntity = createSelector(
  selectMusickitEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
