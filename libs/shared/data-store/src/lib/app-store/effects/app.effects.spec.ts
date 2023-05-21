/* eslint-disable @typescript-eslint/no-unsafe-call */
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as AppActions from '../actions/app.actions';
import { AppEffects } from './app.effects';

describe('AppEffects', () => {
  let actions: Observable<Action>;
  let effects: AppEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        AppEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(AppEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: AppActions.initApp() });

      const expected = hot('-a-|', {
        a: AppActions.loadAppSuccess({ app: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
