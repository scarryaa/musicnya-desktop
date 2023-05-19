import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import { AppEntity } from '../models/app.models';
import copy from 'fast-copy';

export const APP_FEATURE_KEY = 'app';

export interface AppState extends EntityState<AppEntity> {
  selectedId?: string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error?: string | null; // last known error (if any)
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export const appAdapter: EntityAdapter<AppEntity> =
  createEntityAdapter<AppEntity>();

export const initialAppState: AppState = appAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const reducer = createReducer(
  { ...initialAppState },
  on(AppActions.initApp, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),

  on(AppActions.loadAppSuccess, (state, { payload }) =>
    appAdapter.setAll(copy(payload), { ...state, loaded: true })
  ),

  on(AppActions.loadAppFailure, (state) => ({ ...state }))
);

export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
