import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap, from } from 'rxjs';
import { MusicActions, MusicAPIActions } from '../actions';
import { MusickitAPIService } from '@nyan-inc/musickit-typescript';

@Injectable({ providedIn: 'root' })
export class MusicEffects {
  private actions$ = inject(Actions);
  private musickit = inject(MusickitAPIService);

  // addListener$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MusicActions.addEventListener),
  //     tap((action) =>
  //       this.musickit.instance.addEventListener(
  //         action.payload.event,
  //         action.payload.callback
  //       )
  //     ),
  //     switchMap(() => of(MusicActions.addEventListenerSuccess())),
  //     catchError((error: Error) => {
  //       console.error('Error', error);
  //       return of(MusicActions.addEventListenerFailure({ payload: { error } }));
  //     })
  //   )
  // );

  setQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setQueue),
      switchMap((action) => {
        return from(
          this.musickit.setQueue({
            ...action.payload.options,
          })
        );
      }),
      switchMap((shouldPlay: boolean | undefined) => {
        const actions = [];
        actions.push(MusicActions.setQueueSuccess());
        if (shouldPlay) {
          actions.push(MusicActions.play());
        }
        return actions;
      }),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.setQueueFailure);
      })
    )
  );
}
