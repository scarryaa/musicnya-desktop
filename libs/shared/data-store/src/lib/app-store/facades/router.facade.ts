import { Injectable } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  getCurrentUrl$ = this.store.pipe(select((state) => state.state.url));

  constructor(private store: Store<RouterReducerState>) {}
}
