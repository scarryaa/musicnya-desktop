import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as MusickitActions from './musickit.actions';
import { MusickitEffects } from './musickit.effects';
import { MusickitFacade } from './musickit.facade';
import { MusickitEntity } from './musickit.models';
import {
  MUSICKIT_FEATURE_KEY,
  MusickitState,
  initialMusickitState,
  musickitReducer,
} from './musickit.reducer';
import * as MusickitSelectors from './musickit.selectors';

interface TestSchema {
  musickit: MusickitState;
}

describe('MusickitFacade', () => {
  let facade: MusickitFacade;
  let store: Store<TestSchema>;
  const createMusickitEntity = (id: string, name = ''): MusickitEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(MUSICKIT_FEATURE_KEY, musickitReducer),
          EffectsModule.forFeature([MusickitEffects]),
        ],
        providers: [MusickitFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(MusickitFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allMusickit$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allMusickit$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadMusickitSuccess` to manually update list
     */
    it('allMusickit$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allMusickit$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        MusickitActions.loadMusickitSuccess({
          musickit: [createMusickitEntity('AAA'), createMusickitEntity('BBB')],
        })
      );

      list = await readFirst(facade.allMusickit$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
