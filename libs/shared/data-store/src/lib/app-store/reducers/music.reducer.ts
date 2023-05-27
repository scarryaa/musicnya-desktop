import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { MusicActions } from '../actions';

import { MusicEntity } from '../models/music.models';

export const MUSIC_FEATURE_KEY = 'music';

export interface MusicState extends EntityState<MusicEntity> {
  selectedId?: string | number;
  loaded: boolean;
  error?: string | null;
}

export interface MusicPartialState {
  readonly [MUSIC_FEATURE_KEY]: MusicState;
}

export const musicAdapter: EntityAdapter<MusicEntity> =
  createEntityAdapter<MusicEntity>();

export const initialMusicState: MusicState = musicAdapter.getInitialState({
  // set initial required properties
  loaded: false,
  libraryPlaylists: [],
});

const reducer = createReducer(
  { ...initialMusicState },
  on(MusicActions.musicInit, (state) => ({
    ...state,
    loaded: false,
    error: undefined,
  }))
);

export function musicReducer(state: MusicState | undefined, action: Action) {
  return reducer(state, action);
}
