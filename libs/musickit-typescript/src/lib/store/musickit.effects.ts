import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  switchMap,
  catchError,
  of,
  mergeMap,
  tap,
  map,
  filter,
  from,
  forkJoin,
  Observable,
} from 'rxjs';
import { MusickitAPIService } from '../musickit-api/musickit-api.service';
import * as MusickitActions from './musickit.actions';
import * as MusickitFeature from './musickit.reducer';
import { MusickitState } from './musickit.reducer';
import copy from 'fast-copy';

@Injectable({ providedIn: 'root' })
export class MusickitEffects {
  private actions = inject(Actions);
  private store = inject(Store<MusickitState>);
  private musickit = inject(MusickitAPIService);

  init$ = createEffect(() =>
    this.actions.pipe(
      ofType(MusickitActions.initMusickit),
      switchMap((payload) =>
        this.musickit.initMusicKit(payload.payload.config.developerToken)
      ),
      switchMap(() => of(MusickitActions.loadMusickitSuccess())),
      catchError((error) =>
        of(MusickitActions.loadMusickitFailure({ payload: { error } }))
      )
    )
  );

  addListener$ = createEffect(() =>
    this.actions.pipe(
      ofType(MusickitActions.addEventListener),
      tap((action) =>
        this.musickit.instance.addEventListener(
          action.payload.listener.event,
          action.payload.listener.function
        )
      ),
      switchMap(() => of(MusickitActions.addEventListenerSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(
          MusickitActions.addEventListenerFailure({ payload: { error } })
        );
      })
    )
  );

  play$ = createEffect(() =>
    this.actions.pipe(
      ofType(MusickitActions.play),
      switchMap(() => this.musickit.play()),
      switchMap((value) => of(MusickitActions.playSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusickitActions.playFailure({ payload: { error } }));
      })
    )
  );

  setQueue$ = createEffect(() =>
    this.actions.pipe(
      ofType(MusickitActions.setQueue),
      switchMap((action) => {
        return from(
          this.musickit.setQueue({
            ...action.payload.options,
          })
        ).pipe(
          switchMap((shouldPlay: boolean | undefined) => {
            const actions = [];
            actions.push(MusickitActions.setQueueSuccess());
            if (shouldPlay) {
              actions.push(MusickitActions.play());
            }
            return actions;
          }),
          catchError((error) => {
            console.error('Error', error);
            return of(MusickitActions.setQueueFailure);
          })
        );
      })
    )
  );
}
