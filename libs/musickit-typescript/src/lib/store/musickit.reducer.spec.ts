import { Action } from '@ngrx/store';

import * as MusickitActions from './musickit.actions';
import { MusickitEntity } from './musickit.models';
import {
  MusickitState,
  initialMusickitState,
  musickitReducer,
} from './musickit.reducer';

describe('Musickit Reducer', () => {
  const createMusickitEntity = (id: string, name = ''): MusickitEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Musickit actions', () => {
    it('loadMusickitSuccess should return the list of known Musickit', () => {
      const musickit = [
        createMusickitEntity('PRODUCT-AAA'),
        createMusickitEntity('PRODUCT-zzz'),
      ];
      const action = MusickitActions.loadMusickitSuccess({ musickit });

      const result: MusickitState = musickitReducer(
        initialMusickitState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = musickitReducer(initialMusickitState, action);

      expect(result).toBe(initialMusickitState);
    });
  });
});
