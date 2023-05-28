import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Musickit, MusickitAPI, MusickitBase } from '@yan-inc/core-services';
import {
  switchMap,
  catchError,
  of,
  tap,
  from,
  concatMap,
  filter,
  withLatestFrom,
} from 'rxjs';
import { MusicKit } from '../../../types';
import { MusicActions, MusicAPIActions } from '../actions';
import { fromMusic } from '../reducers';

@Injectable({ providedIn: 'root' })
export class MusicEffects {
  private actions$ = inject(Actions);
  private music = inject(Musickit);
  private store = inject(Store);

  addListener$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.addEventListener),
      tap((action) =>
        this.music._instance.addEventListener(
          action.payload.event,
          action.payload.callback
        )
      ),
      switchMap(() => of(MusicActions.addEventListenerSuccess())),
      catchError((error: Error) => {
        console.error('Error', error);
        return of(MusicActions.addEventListenerFailure({ payload: { error } }));
      })
    )
  );

  removeListener$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.removeEventListener),
      tap((action) =>
        this.music._instance.removeEventListener(
          action.payload.event,
          action.payload.callback
        )
      ),
      switchMap(() => of(MusicActions.removeEventListenerSuccess())),
      catchError((error: Error) => {
        console.error('Error', error);
        return of(
          MusicActions.removeEventListenerFailure({ payload: { error } })
        );
      })
    )
  );

  setQueue$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setQueue),
      switchMap((action) =>
        from(this.music.setQueue(action.payload.options as any))
      ),
      switchMap((shouldPlay) => {
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

  shufflePlay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.shufflePlay),
      concatMap(async (action) => [
        (this.music.instance.shuffleMode = 1),
        await this.music.setQueue({
          ...action.payload.options,
          startPlaying: true,
        } as any),
      ]),
      switchMap(() => of(MusicActions.shufflePlaySuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.shufflePlayFailure);
      })
    )
  );

  setQueueThenPlay$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setQueueThenPlay),
      concatMap(async (action) => [
        await this.music.setQueue({
          ...action.payload.options,
          startPlaying: true,
        } as any),
      ]),
      switchMap(() => of(MusicActions.setQueueThenPlaySuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.setQueueThenPlayFailure);
      })
    )
  );

  play$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.play),
      withLatestFrom(
        this.store.select(fromMusic.MUSIC_FEATURE_KEY, 'currentItem')
      ),
      filter(([action, currentItem]) => currentItem !== null),
      switchMap(() => from(this.music.play())),
      switchMap(() => of(MusicActions.playSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.playFailure);
      })
    )
  );

  setShuffleMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setShuffleMode),
      tap(() => {
        if (
          this.music.instance.shuffleMode.valueOf() ===
          MusicKit.PlayerShuffleMode.off
        ) {
          (this.music.instance.shuffleMode as any) =
            MusicKit.PlayerShuffleMode.songs;
        } else {
          (this.music.instance.shuffleMode as any) =
            MusicKit.PlayerShuffleMode.off;
        }
      }),
      switchMap(() =>
        of(
          MusicActions.setShuffleModeSuccess({
            payload: {
              shuffleMode: this.music.instance.shuffleMode.valueOf() as any,
            },
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.setShuffleModeFailure({ payload: { error } }));
      })
    )
  );

  setRepeatMode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setRepeatMode),
      tap(() => {
        if (
          this.music.instance.repeatMode.valueOf() ===
          MusicKit.PlayerRepeatMode.none
        ) {
          (this.music.instance.repeatMode as any) =
            MusicKit.PlayerRepeatMode.one;
        } else if (
          this.music.instance.repeatMode.valueOf() ===
          MusicKit.PlayerRepeatMode.one
        ) {
          (this.music.instance.repeatMode as any) =
            MusicKit.PlayerRepeatMode.all;
        } else {
          (this.music.instance.repeatMode as any) =
            MusicKit.PlayerRepeatMode.none;
        }
      }),
      switchMap(() =>
        of(
          MusicActions.setRepeatModeSuccess({
            payload: {
              repeatMode: this.music.instance.repeatMode.valueOf() as any,
            },
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.setRepeatModeFailure({ payload: { error } }));
      })
    )
  );

  pause$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.pause),
      switchMap(() => from(this.music.pause())),
      switchMap(() => of(MusicActions.pauseSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.pauseFailure);
      })
    )
  );

  skipToNextItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.skipToNextItem),
      switchMap(() => from(this.music.skipToNextItem())),
      switchMap(() => of(MusicActions.skipToNextItemSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.skipToNextItemFailure);
      })
    )
  );

  skipToPreviousItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.skipToPreviousItem),
      switchMap(() => from(this.music.skipToPreviousItem())),
      switchMap(() => of(MusicActions.skipToPreviousItemSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.skipToPreviousItemFailure);
      })
    )
  );

  changeToMediaAtIndex$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.changeToMediaAtIndex),
      switchMap((action) =>
        from(this.music.changeToMediaAtIndex(action.payload.index))
      ),
      switchMap(() => of(MusicActions.changeToMediaAtIndexSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.changeToMediaAtIndexFailure);
      })
    )
  );

  seekToTime$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.seekToTime),
      switchMap((action) => from(this.music.seekToTime(action.payload.time))),
      switchMap(() => of(MusicActions.seekToTimeSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.seekToTimeFailure);
      })
    )
  );

  setQueueFromMediaItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setQueueFromMediaItems),
      switchMap((action) =>
        from(this.music.setQueueFromMediaItems(action.payload.items as any))
      ),
      switchMap(() => of(MusicActions.setQueueFromMediaItemsSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.setQueueFromMediaItemsFailure);
      })
    )
  );

  setQueueFromSongIDs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setQueueFromSongIDs),
      switchMap((action) =>
        from(this.music.setQueueFromSongIDs(action.payload.ids))
      ),
      switchMap(() => of(MusicActions.setQueueFromSongIDsSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.setQueueFromSongIDsFailure);
      })
    )
  );

  setVolume$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicActions.setVolume),
      switchMap((action) => from(this.music.setVolume(action.payload.volume))),
      switchMap(() => of(MusicActions.setVolumeSuccess())),
      catchError((error) => {
        console.error('Error', error);
        return of(MusicActions.setVolumeFailure);
      })
    )
  );
}
