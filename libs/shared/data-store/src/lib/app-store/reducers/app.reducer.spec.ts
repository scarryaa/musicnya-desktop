import { Action } from '@ngrx/store';

import * as AppActions from './actions/app.actions';
import { AppEntity } from './models/app.models';
import { AppState, initialAppState, appReducer } from './app.reducer';

describe('App Reducer', () => {
  const createAppEntity = (id: string, name = ''): AppEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid App actions', () => {
    it('loadAppSuccess should return the list of known App', () => {
      const app = [
        createAppEntity('PRODUCT-AAA'),
        createAppEntity('PRODUCT-zzz'),
      ];
      const action = AppActions.loadAppSuccess({ app });

      const result: AppState = appReducer(initialAppState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = appReducer(initialAppState, action);

      expect(result).toBe(initialAppState);
    });
  });
});
