import { Injectable } from '@angular/core';
import { RouterReducerState } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  constructor(private store: Store<RouterReducerState>) {}

  getCurrentUrl$ = this.store.pipe(select((state) => state?.state?.url));
  getNavigated$ = this.store.pipe(select(() => fromRouter.ROUTER_NAVIGATED));
  getParams$ = this.store.pipe(select((state) => state?.state?.root?.url));
}
