import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import { AppEntity } from '../models/app.models';

export const APP_FEATURE_KEY = 'app';

export interface AppState extends EntityState<AppEntity> {
  selectedId?: string | number; // which App record has been selected
  loaded: boolean; // has the App list been loaded
  error?: string | undefined | Error; // last known error (if any)
  loggedInAppleMusic: boolean;
  loggedInSpotify: boolean;
}

export interface AppPartialState {
  readonly [APP_FEATURE_KEY]: AppState;
}

export const appAdapter: EntityAdapter<AppEntity> =
  createEntityAdapter<AppEntity>();

export const initialAppState: AppState = appAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  loggedInAppleMusic: false,
  loggedInSpotify: false,
});

const reducer = createReducer(
  initialAppState,
  on(AppActions.initApp, (state) => ({
    ...state,
    loaded: false,
    loggedInAppleMusic: false,
    loggedInSpotify: false,
    error: undefined,
  })),
  on(AppActions.initAppSuccess, (state) => ({ ...state })),
  on(AppActions.initAppFailure, (state) => ({ ...state })),

  on(AppActions.checkForLogins, (state) => ({
    ...state,
  })),
  on(AppActions.checkForLoginsSuccess, (state, { payload: { data } }) => ({
    ...state,
    loggedInAppleMusic: data.loggedInAppleMusic,
    loggedInSpotify: data.loggedInSpotify,
  })),
  on(AppActions.checkForLoginsFailure, (state, { payload: { error } }) => ({
    ...state,
    loggedInAppleMusic: false,
    loggedInSpotify: false,
    error: error,
  })),

  on(AppActions.loginAppleMusic, (state) => ({
    ...state,
  })),
  on(AppActions.loginAppleMusicSuccess, (state) => ({
    ...state,
    loggedInAppleMusic: true,
  })),
  on(AppActions.loginAppleMusicFailure, (state, { payload: { error } }) => ({
    ...state,
    loggedInAppleMusic: false,
    error: error,
  })),

  on(AppActions.logoutAppleMusic, (state) => ({
    ...state,
  })),
  on(AppActions.logoutAppleMusicSuccess, (state) => ({
    ...state,
    loggedInAppleMusic: false,
  })),
  on(AppActions.logoutAppleMusicFailure, (state, { payload: { error } }) => ({
    ...state,
    loggedInAppleMusic: true,
    error: error,
  })),

  on(AppActions.loginSpotify, (state) => ({
    ...state,
  })),
  on(AppActions.loginSpotifySuccess, (state) => ({
    ...state,
    loggedInSpotify: true,
  })),
  on(AppActions.loginSpotifyFailure, (state, { payload: { error } }) => ({
    ...state,
    loggedInSpotify: false,
    error: error,
  })),

  on(AppActions.logoutSpotify, (state) => ({
    ...state,
  })),
  on(AppActions.logoutSpotifySuccess, (state) => ({
    ...state,
    loggedInSpotify: false,
  })),
  on(AppActions.logoutSpotifyFailure, (state, { payload: { error } }) => ({
    ...state,
    loggedInSpotify: true,
    error: error,
  }))
);

export const getAppState = (state: AppState) => state;

export function appReducer(state: AppState | undefined, action: Action) {
  return reducer(state, action);
}
