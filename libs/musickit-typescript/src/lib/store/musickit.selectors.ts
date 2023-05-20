import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  MUSICKIT_FEATURE_KEY,
  MusickitState,
  musickitAdapter,
} from './musickit.reducer';
import copy from 'fast-copy';

// Lookup the 'Musickit' feature state managed by NgRx
export const selectMusickitState =
  createFeatureSelector<MusickitState>(MUSICKIT_FEATURE_KEY);

const { selectAll, selectEntities } = copy(musickitAdapter.getSelectors());

export const selectMusickitLoaded = createSelector(
  selectMusickitState,
  (state: MusickitState) => copy(state.loaded)
);

export const selectMusickitError = createSelector(
  selectMusickitState,
  (state: MusickitState) => copy(state.error)
);

export const selectAllMusickit = createSelector(
  selectMusickitState,
  (state: MusickitState) => copy(selectAll(state))
);

export const selectMusickitEntities = createSelector(
  selectMusickitState,
  (state: MusickitState) => copy(selectEntities(state))
);

export const selectSelectedId = createSelector(
  selectMusickitState,
  (state: MusickitState) => copy(state.selectedId)
);

export const selectUserPlaylists = createSelector(
  selectMusickitState,
  (state: MusickitState) => copy(state.userPlaylists)
);

export const selectEntity = createSelector(
  selectMusickitEntities,
  selectSelectedId,
  (entities, selectedId) => copy(selectedId ? entities[selectedId] : undefined)
);
