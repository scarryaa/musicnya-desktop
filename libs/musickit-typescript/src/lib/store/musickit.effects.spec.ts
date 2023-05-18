import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as MusickitActions from './musickit.actions';
import { MusickitEffects } from './musickit.effects';

describe('MusickitEffects', () => {
  let actions: Observable<Action>;
  let effects: MusickitEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        MusickitEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(MusickitEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: MusickitActions.initMusickit() });

      const expected = hot('-a-|', {
        a: MusickitActions.loadMusickitSuccess({ musickit: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
