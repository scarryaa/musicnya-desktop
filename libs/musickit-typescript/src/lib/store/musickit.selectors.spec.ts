import { MusickitEntity } from './musickit.models';
import {
  musickitAdapter,
  MusickitPartialState,
  initialMusickitState,
} from './musickit.reducer';
import * as MusickitSelectors from './musickit.selectors';

describe('Musickit Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getMusickitId = (it: MusickitEntity) => it.id;
  const createMusickitEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as MusickitEntity);

  let state: MusickitPartialState;

  beforeEach(() => {
    state = {
      musickit: musickitAdapter.setAll(
        [
          createMusickitEntity('PRODUCT-AAA'),
          createMusickitEntity('PRODUCT-BBB'),
          createMusickitEntity('PRODUCT-CCC'),
        ],
        {
          ...initialMusickitState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Musickit Selectors', () => {
    it('selectAllMusickit() should return the list of Musickit', () => {
      const results = MusickitSelectors.selectAllMusickit(state);
      const selId = getMusickitId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = MusickitSelectors.selectEntity(state) as MusickitEntity;
      const selId = getMusickitId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectMusickitLoaded() should return the current "loaded" status', () => {
      const result = MusickitSelectors.selectMusickitLoaded(state);

      expect(result).toBe(true);
    });

    it('selectMusickitError() should return the current "error" state', () => {
      const result = MusickitSelectors.selectMusickitError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
