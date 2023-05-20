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
      switchMap(() =>
        of(MusickitActions.loadMusickitSuccess()).pipe(
          switchMap(() => of(MusickitActions.getUserPlaylists()))
        )
      ),
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
          action.payload.event,
          action.payload.callback
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
      switchMap(() => of(MusickitActions.playSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusickitActions.playFailure({ payload: { error } }));
      })
    )
  );

  getUserPlaylists$ = createEffect(() =>
    this.actions.pipe(
      ofType(MusickitActions.getUserPlaylists),
      switchMap(() => this.musickit.getUserPlaylists()),
      switchMap(async (response) => {
        let [...expandedInfo] = await Promise.all(
          response
            .map((value) => value.href)
            .map((value) => this.musickit.findByUrl(value))
        );

        console.log(expandedInfo);
        let final = response.map((item, i) => ({
          ...item,
          ...expandedInfo[i].data.data[0],
        }));

        console.log(final);
        return of(final as MusicKit.LibraryPlaylists[]);
      }),
      switchMap((value) => value),
      switchMap((response: MusicKit.LibraryPlaylists[]) =>
        of(
          MusickitActions.getUserPlaylistsSuccess({
            payload: {
              data: response,
            },
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(
          MusickitActions.getUserPlaylistsFailure({ payload: { error } })
        );
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
