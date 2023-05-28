import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
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
  on(PreferencesActions.prefsInit, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),

  on(PreferencesActions.prefsInitSuccess, (state) => ({
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
