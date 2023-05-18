import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import {
  Action,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';

import * as LayoutActions from '../actions/layout.actions';
import { LayoutEntity } from '../models/layout.models';

export const LAYOUT_FEATURE_KEY = 'layout';

export interface LayoutState extends EntityState<LayoutEntity> {
  selectedId?: string | number;
  drawerOpen: boolean;
  drawerClosed: boolean;
}

export interface LayoutPartialState {
  readonly [LAYOUT_FEATURE_KEY]: LayoutState;
}

export const layoutAdapter: EntityAdapter<LayoutEntity> =
  createEntityAdapter<LayoutEntity>();

export const initialLayoutState: LayoutState = layoutAdapter.getInitialState({
  drawerOpen: false,
  drawerClosed: true,
});

export const reducer = createReducer(
  initialLayoutState,
  on(LayoutActions.openDrawer, (state: LayoutState) => ({
    ...state,
    drawerOpen: true,
    drawerClosed: false,
  })),
  on(LayoutActions.closeDrawer, (state: LayoutState) => ({
    ...state,
    drawerOpen: false,
    drawerClosed: true,
  }))
);

export function layoutReducer(state: LayoutState | undefined, action: Action) {
  return reducer(state, action);
}

export const drawerOpen = (state: LayoutState) => state.drawerOpen;

export const getLayoutState =
  createFeatureSelector<LayoutState>(LAYOUT_FEATURE_KEY);

export const getDrawerOpen = createSelector(getLayoutState, drawerOpen);
