import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType, concatLatestFrom } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap, catchError, of, mergeMap, tap, map, filter } from 'rxjs';
import { MusickitAPIService } from '../musickit-api/musickit-api.service';
import * as MusickitActions from './musickit.actions';
import * as MusickitFeature from './musickit.reducer';
import { MusickitState } from './musickit.reducer';

@Injectable({ providedIn: 'root' })
export class MusickitEffects {
  private actions = inject(Actions);
  private store = inject(Store<MusickitState>);
  private musickit = inject(MusickitAPIService);

  init$ = createEffect(() =>
    this.actions.pipe(
      ofType(MusickitActions.initMusickit),
      tap(
        (payload) =>
          void this.musickit.initMusicKit(payload.payload.config.developerToken)
      ),
      map(
        () => MusickitActions.loadMusickitSuccess(),
        catchError((error) =>
          of(MusickitActions.loadMusickitFailure({ payload: { error } }))
        )
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
      tap(() => this.musickit.instance.play()),
      switchMap(() => of(MusickitActions.playSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusickitActions.playFailure({ payload: { error } }));
      })
    )
  );

  setQueue$ = createEffect(() =>
    this.actions.pipe(
      ofType(MusickitActions.setQueue),
      tap(
        (action) => void this.musickit.instance.setQueue(action.payload.options)
      ),
      switchMap(() => of(MusickitActions.setQueueSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusickitActions.setQueueFailure({ payload: { error } }));
      })
    )
  );
}
