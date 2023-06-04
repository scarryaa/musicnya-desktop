import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { LibraryPlaylists } from '@nyan-inc/core';
import { getMusicAPIState, MusicAPIState } from '@nyan-inc/shared';
import { filter, map, Observable, switchMap } from 'rxjs';
import { LayoutActions } from '../actions';
import { getLayoutState, LayoutState } from '../reducers/layout.reducer';

export const getDrawerOpen$ = createSelector(
  getLayoutState,
  (state: LayoutState) => state.drawerOpen
);
@Injectable({
  providedIn: 'root',
})
export class LayoutFacade {
  constructor(private store: Store<LayoutState & MusicAPIState>) {}

  drawerOpen$ = this.store.pipe(select(getDrawerOpen$));

  setView = (view: 'songs' | 'artists' | 'albums' | 'playlists') =>
    this.store.dispatch(LayoutActions.setView({ payload: { view: view } }));

  // set current view from musicAPI store based on current view
  currentView$ = this.store.pipe(
    select(getMusicAPIState),
    map((state) => state.libraryPlaylists)
  );

  openDrawer = () => this.store.dispatch(LayoutActions.openDrawer());
  closeDrawer = () => this.store.dispatch(LayoutActions.closeDrawer());
}
