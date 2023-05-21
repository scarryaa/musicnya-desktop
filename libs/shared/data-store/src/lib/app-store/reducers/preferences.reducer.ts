import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import copy from 'fast-copy';
import { PreferencesActions } from '../actions';
import { PreferencesEntity } from '../models/preferences.models';

export const Preferences_API_FEATURE_KEY = 'Preferences_api';

export interface PreferencesState extends EntityState<PreferencesEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface PreferencesPartialState {
  readonly [Preferences_API_FEATURE_KEY]: PreferencesState;
}

export const PreferencesAdapter: EntityAdapter<PreferencesEntity> =
  createEntityAdapter<PreferencesEntity>();

export const initialPreferencesState: PreferencesState =
  PreferencesAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  { ...initialPreferencesState },
  on(AppActions.initApp, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),

  on(PreferencesActions.prefsInitSuccess, (state, { payload }) => ({
    ...state,
  })),

  on(PreferencesActions.prefsInitFailure, (state) => ({ ...state }))
);

export function PreferencesReducer(
  state: PreferencesState | undefined,
  action: Action
) {
  return reducer(state, action);
}
