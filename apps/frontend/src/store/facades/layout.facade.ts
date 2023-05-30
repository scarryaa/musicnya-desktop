import { inject, Injectable } from '@angular/core';
import { createSelector, select, Store } from '@ngrx/store';
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
  constructor(private store: Store<LayoutState>) {}

  drawerOpen$ = this.store.pipe(select(getDrawerOpen$));

  openDrawer = () => this.store.dispatch(LayoutActions.openDrawer());

  closeDrawer = () => this.store.dispatch(LayoutActions.closeDrawer());
}
