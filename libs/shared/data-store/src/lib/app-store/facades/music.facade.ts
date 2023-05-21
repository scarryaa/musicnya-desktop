import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { MusicState } from '../reducers/music.reducer';

@Injectable({
  providedIn: 'root',
})
export class MusicFacade {
  constructor(private store: Store<MusicState>) {}
}
