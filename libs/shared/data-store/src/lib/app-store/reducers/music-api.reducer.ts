import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as AppActions from '../actions/app.actions';
import copy from 'fast-copy';
import { MusicAPIActions } from '../actions';
import { MusicAPIEntity } from '../models/music-api.models';
import { LibraryPlaylist } from '@nyan-inc/core';

export const MusicAPI_API_FEATURE_KEY = 'MusicAPI_api';

export interface MusicAPIState extends EntityState<MusicAPIEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
  libraryPlaylists: LibraryPlaylist[];
}

export interface MusicAPIPartialState {
  readonly [MusicAPI_API_FEATURE_KEY]: MusicAPIState;
}

export const MusicAPIAdapter: EntityAdapter<MusicAPIEntity> =
  createEntityAdapter<MusicAPIEntity>();

export const initialMusicAPIState: MusicAPIState =
  MusicAPIAdapter.getInitialState({
    // set initial required properties
    loaded: false,
    libraryPlaylists: [],
  });

const reducer = createReducer(
  { ...initialMusicAPIState },
  on(AppActions.initApp, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  })),

  on(MusicAPIActions.initSuccess, (state) =>
    MusicAPIAdapter.setMany([], { ...state, loaded: true })
  ),

  on(MusicAPIActions.initFailure, (state) => ({ ...state }))
);

export function MusicAPIReducer(
  state: MusicAPIState | undefined,
  action: Action
) {
  return reducer(state, action);
}
