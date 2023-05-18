import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromMusickit from './store/musickit.reducer';
import { MusickitEffects } from './store/musickit.effects';
import { MusickitFacade } from './store/musickit.facade';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    MusickitFacade,
    provideStore({ musickit: fromMusickit.musickitReducer }),
    provideEffects([MusickitEffects]),
  ],
})
export class MusickitStoreModule {}
