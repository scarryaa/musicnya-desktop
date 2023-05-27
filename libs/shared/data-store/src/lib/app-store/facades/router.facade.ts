import { Injectable } from '@angular/core';
import { RouterState } from '@ngrx/router-store';
import { select, Store } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

@Injectable({
  providedIn: 'root',
})
export class RouterFacade {
  routerNavigated$ = this.store.pipe(
    select(() => fromRouter.routerNavigatedAction)
  );
  routerNavigation$ = this.store.pipe(
    select(() => fromRouter.routerNavigationAction)
  );

  constructor(private store: Store<RouterState>) {}
}
