import { Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
import { MusicAPIState } from '@nyan-inc/shared';
import { MusicKit } from '@nyan-inc/shared-types';
import { selectAllLibraryPlaylists } from 'libs/shared/data-store/src/lib/app-store/selectors/library-playlists.selectors';
import { filter } from 'rxjs';
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
    select(selectAllLibraryPlaylists),
    filter((playlists: MusicKit.LibraryPlaylists[]) => playlists.length > 0)
  );

  openDrawer = () => this.store.dispatch(LayoutActions.openDrawer());
  closeDrawer = () => this.store.dispatch(LayoutActions.closeDrawer());
}
