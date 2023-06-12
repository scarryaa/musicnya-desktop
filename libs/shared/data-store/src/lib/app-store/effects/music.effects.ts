import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { Musickit, MusickitAPI } from '@nyan-inc/core-services';
import { MusicKit } from '@nyan-inc/shared-types';
import {
  switchMap,
  catchError,
  of,
  tap,
  from,
  concatMap,
  filter,
  withLatestFrom,
  mergeMap,
  map,
  take,
} from 'rxjs';
import { MusicActions } from '../actions';
import { fromMusic } from '../reducers';

export const addListener$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.addEventListener),
      tap((action) =>
        music._instance.addEventListener(
          action.payload.event,
          action.payload.callback
        )
      ),
      switchMap(() => of(MusicActions.addEventListenerSuccess())),
      catchError((error: Error) => {
        return of(MusicActions.addEventListenerFailure({ payload: { error } }));
      })
    ),
  { functional: true }
);

export const removeListener$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.removeEventListener),
      tap((action) =>
        music._instance.removeEventListener(
          action.payload.event,
          action.payload.callback
        )
      ),
      switchMap(() => of(MusicActions.removeEventListenerSuccess())),
      catchError((error: Error) => {
        return of(
          MusicActions.removeEventListenerFailure({ payload: { error } })
        );
      })
    ),
  { functional: true }
);

export const setQueue$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.setQueue),
      switchMap((action) =>
        from(music.setQueue(action.payload.options as any))
      ),
      switchMap((shouldPlay) => {
        const actions = [MusicActions.setQueueSuccess()];
        const actionsWithPlay = [...actions, MusicActions.play()];
        return shouldPlay ? actionsWithPlay : actions;
      }),
      catchError(() => {
        return of(MusicActions.setQueueFailure);
      })
    ),
  { functional: true }
);

export const shufflePlay$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.shufflePlay),
      concatMap(async (action) => [
        // eslint-disable-next-line functional/immutable-data
        (music.instance.shuffleMode = 1),
        await music.setQueue({
          ...action.payload.options,
          startPlaying: true,
        } as any),
      ]),
      switchMap(() => of(MusicActions.shufflePlaySuccess())),
      catchError(() => {
        return of(MusicActions.shufflePlayFailure);
      })
    ),
  { functional: true }
);

export const setQueueThenPlay$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.setQueueThenPlay),
      concatMap(async (action) => [
        await music.setQueue({
          ...action.payload.options,
          startPlaying: true,
        } as any),
      ]),
      switchMap(() => of(MusicActions.setQueueThenPlaySuccess()))
    ),
  { functional: true }
);

export const play$ = createEffect(
  (
    actions$ = inject(Actions),
    music = inject(Musickit),
    store = inject(Store)
  ) =>
    actions$.pipe(
      ofType(MusicActions.play),
      withLatestFrom(store.pipe(select(() => fromMusic.getCurrentItem))),
      filter(([, currentItem]) => !!currentItem),
      switchMap(() => from(music.play())),
      switchMap(() => of(MusicActions.playSuccess())),
      catchError(() => {
        return of(MusicActions.playFailure);
      })
    ),
  { functional: true }
);

export const setShuffleMode$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.setShuffleMode),
      tap(() => {
        if (
          music.instance.shuffleMode.valueOf() ===
          MusicKit.PlayerShuffleMode.off
        ) {
          (music.instance.shuffleMode as any) =
            MusicKit.PlayerShuffleMode.songs;
        } else {
          (music.instance.shuffleMode as any) = MusicKit.PlayerShuffleMode.off;
        }
      }),
      switchMap(() =>
        of(
          MusicActions.setShuffleModeSuccess({
            payload: {
              shuffleMode: music.instance.shuffleMode.valueOf() as any,
            },
          })
        )
      ),
      catchError((error) => {
        return of(MusicActions.setShuffleModeFailure({ payload: { error } }));
      })
    ),
  { functional: true }
);

export const setRepeatMode$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.setRepeatMode),
      tap(() => {
        (music.instance.repeatMode as any) =
          music.instance.repeatMode.valueOf() === MusicKit.PlayerRepeatMode.none
            ? MusicKit.PlayerRepeatMode.one
            : music.instance.repeatMode.valueOf() ===
              MusicKit.PlayerRepeatMode.one
            ? MusicKit.PlayerRepeatMode.all
            : MusicKit.PlayerRepeatMode.none;
      }),
      switchMap(() =>
        of(
          MusicActions.setRepeatModeSuccess({
            payload: {
              repeatMode: music.instance.repeatMode.valueOf() as any,
            },
          })
        )
      ),
      catchError((error: Error) => {
        return of(MusicActions.setRepeatModeFailure({ payload: { error } }));
      })
    ),
  { functional: true }
);

export const pause$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.pause),
      switchMap(() => from(music.pause())),
      switchMap(() => of(MusicActions.pauseSuccess())),
      catchError(() => {
        return of(MusicActions.pauseFailure);
      })
    ),
  { functional: true }
);

export const skipToNextItem$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.skipToNextItem),
      switchMap(() => from(music.skipToNextItem())),
      switchMap(() => of(MusicActions.skipToNextItemSuccess())),
      catchError(() => {
        return of(MusicActions.skipToNextItemFailure);
      })
    ),
  { functional: true }
);

export const skipToPreviousItem$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.skipToPreviousItem),
      switchMap(() => from(music.skipToPreviousItem())),
      switchMap(() => of(MusicActions.skipToPreviousItemSuccess())),
      catchError(() => {
        return of(MusicActions.skipToPreviousItemFailure);
      })
    ),
  { functional: true }
);

export const changeToMediaAtIndex$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.changeToMediaAtIndex),
      switchMap((action) =>
        from(music.changeToMediaAtIndex(action.payload.index))
      ),
      switchMap(() => of(MusicActions.changeToMediaAtIndexSuccess())),
      catchError(() => {
        return of(MusicActions.changeToMediaAtIndexFailure);
      })
    ),
  { functional: true }
);

export const seekToTime$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.seekToTime),
      switchMap((action) => from(music.seekToTime(action.payload.time))),
      switchMap(() => of(MusicActions.seekToTimeSuccess())),
      catchError(() => {
        return of(MusicActions.seekToTimeFailure);
      })
    ),
  { functional: true }
);

export const setQueueFromMediaItems$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.setQueueFromMediaItems),
      switchMap((action) =>
        from(music.setQueueFromMediaItems(action.payload.items as any))
      ),
      switchMap(() => of(MusicActions.setQueueFromMediaItemsSuccess())),
      catchError(() => {
        return of(MusicActions.setQueueFromMediaItemsFailure);
      })
    ),
  { functional: true }
);

export const setQueueFromSongIDs$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.setQueueFromSongIDs),
      switchMap((action) =>
        from(music.setQueueFromSongIDs(action.payload.ids))
      ),
      switchMap(() => of(MusicActions.setQueueFromSongIDsSuccess())),
      catchError(() => {
        return of(MusicActions.setQueueFromSongIDsFailure);
      })
    ),
  { functional: true }
);

export const setVolume$ = createEffect(
  (actions$ = inject(Actions), music = inject(Musickit)) =>
    actions$.pipe(
      ofType(MusicActions.setVolume),
      map((action) => music.setVolume(action.payload.volume)),
      map(() => MusicActions.setVolumeSuccess()),
      catchError(() => {
        return of(MusicActions.setVolumeFailure);
      })
    ),
  { functional: true }
);

// Fetches an artist from a song id
export const getArtistFromSongID$ = createEffect(
  (actions$ = inject(Actions), musickit = inject(MusickitAPI)) =>
    actions$.pipe(
      ofType(MusicActions.getArtistFromSongID),
      mergeMap((action) =>
        from(musickit.getArtistFromSongID(action.payload.songId))
      ),
      map((data) => {
        const mappedData = data[0];
        return MusicActions.getArtistFromSongIDSuccess({
          payload: { data: mappedData },
        });
      }),
      catchError((error) => {
        return of(
          MusicActions.getArtistFromSongIDFailure({ payload: { error } })
        );
      })
    ),
  { functional: true }
);
