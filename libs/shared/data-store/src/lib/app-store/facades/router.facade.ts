import { Injectable } from '@angular/core';
import { RouterReducerState, RouterState } from '@ngrx/router-store';
import { createSelector, select, Store } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  getCurrentUrl$ = this.store.pipe(select((state) => state.state.url));

  constructor(private store: Store<RouterReducerState>) {}
}
