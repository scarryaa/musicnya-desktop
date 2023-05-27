import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getMediaLoaded, MusicState } from '../reducers/music.reducer';

@Injectable({
  providedIn: 'root',
})
export class PlayerFacade {
  state$ = this.store.pipe(select((state) => state));
  mediaLoaded$ = this.store.pipe(select(getMediaLoaded));

  constructor(private store: Store<MusicState>) {}
}
