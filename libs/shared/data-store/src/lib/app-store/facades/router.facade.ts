import { Injectable } from '@angular/core';
import { RouterState } from '@ngrx/router-store';
import { Store } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  routerNavigated$ = this.store.select(() => fromRouter.ROUTER_NAVIGATED);
  routerNavigation$ = this.store.select(() => fromRouter.ROUTER_NAVIGATION);

  constructor(private store: Store<RouterState>) {}
}
