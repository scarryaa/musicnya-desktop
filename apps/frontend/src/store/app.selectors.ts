import { createFeatureSelector, createSelector } from '@ngrx/store';
import { APP_FEATURE_KEY, AppState, appAdapter } from './reducers/app.reducer';

// Lookup the 'App' feature state managed by NgRx
export const selectAppState = createFeatureSelector<AppState>(APP_FEATURE_KEY);

const { selectAll, selectEntities } = appAdapter.getSelectors();

export const selectAppLoaded = createSelector(
  selectAppState,
  (state: AppState) => state.loaded
);

export const selectAppError = createSelector(
  selectAppState,
  (state: AppState) => state.error
);

export const selectAllApp = createSelector(selectAppState, (state: AppState) =>
  selectAll(state)
);

export const selectAppEntities = createSelector(
  selectAppState,
  (state: AppState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectAppState,
  (state: AppState) => state.selectedId
);

export const selectEntity = createSelector(
  selectAppEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
