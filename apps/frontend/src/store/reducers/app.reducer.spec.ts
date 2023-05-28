import { Action } from '@ngrx/store';
import { AppEntity } from '../models/app.models';
import * as AppActions from '../actions/app.actions';

import { AppState, initialAppState, appReducer } from './app.reducer';
const createAppEntity = (id: string, name = ''): AppEntity =>
  ({ payload: { id, name } } as AppEntity);

describe('App Reducer', () => {
  describe('valid App actions', () => {
    it('loadAppSuccess should return the list of known App', () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const app = [
        createAppEntity('PRODUCT-AAA'),
        createAppEntity('PRODUCT-zzz'),
      ];
      const action = AppActions.initAppSuccess();

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
