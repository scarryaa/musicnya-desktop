import { AppEntity } from './models/app.models';
import {
  appAdapter,
  AppPartialState,
  initialAppState,
} from './reducers/app.reducer';
import * as AppSelectors from './app.selectors';

describe('App Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getAppId = (it: AppEntity) => it.id;
  const createAppEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as AppEntity);

  let state: AppPartialState;

  beforeEach(() => {
    state = {
      app: appAdapter.setAll(
        [
          createAppEntity('PRODUCT-AAA'),
          createAppEntity('PRODUCT-BBB'),
          createAppEntity('PRODUCT-CCC'),
        ],
        {
          ...initialAppState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('App Selectors', () => {
    it('selectAllApp() should return the list of App', () => {
      const results = AppSelectors.selectAllApp(state);
      const selId = getAppId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = AppSelectors.selectEntity(state) as AppEntity;
      const selId = getAppId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectAppLoaded() should return the current "loaded" status', () => {
      const result = AppSelectors.selectAppLoaded(state);

      expect(result).toBe(true);
    });

    it('selectAppError() should return the current "error" state', () => {
      const result = AppSelectors.selectAppError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
