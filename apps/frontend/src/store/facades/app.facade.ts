import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppActions } from '../actions';
import { AppState } from '../reducers/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AppFacade {
  constructor(private store: Store<AppState>) {}

  state$ = this.store.select((state) => state);
  loggedInAppleMusic$ = this.store.select((state) => state.loggedInAppleMusic);
  loggedInSpotify$ = this.store.select((state) => state.loggedInSpotify);

  initApp() {
    this.store.dispatch(AppActions.initApp());
  }

  checkForLogins() {
    this.store.dispatch(AppActions.checkForLogins());
  }

  loginAppleMusic() {
    this.store.dispatch(AppActions.loginAppleMusic());
  }

  logoutAppleMusic() {
    this.store.dispatch(AppActions.logoutAppleMusic());
  }

  loginSpotify() {
    this.store.dispatch(AppActions.loginSpotify());
  }

  logoutSpotify() {
    this.store.dispatch(AppActions.logoutSpotify());
  }
}
