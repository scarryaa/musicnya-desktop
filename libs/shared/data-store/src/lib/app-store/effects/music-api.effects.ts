import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of, tap, map, from } from 'rxjs';
import { MusicAPIActions, MusicActions } from '../actions';
import { LibrarySong, determineTypeAndMap, fromMusickit } from '@nyan-inc/core';
// import { MusickitAPIService } from '@nyan-inc/musickit-typescript';

@Injectable({ providedIn: 'root' })
export class MusicAPIEffects {
  private actions$ = inject(Actions);
  // private musickit = inject(MusickitAPIService);

  // init$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MusicAPIActions.init),
  //     switchMap((payload) =>
  //       this.musickit.initMusicKit(payload.payload.config.developerToken)
  //     ),
  //     switchMap(() =>
  //       of(MusicAPIActions.initSuccess()).pipe(
  //         switchMap(() => of(MusicAPIActions.getLibraryPlaylists()))
  //       )
  //     ),
  //     catchError((error: Error) => {
  //       console.error('Error', error);
  //       return of(MusicAPIActions.initFailure({ payload: { error } }));
  //     })
  //   )
  // );

  // getLibraryPlaylists$ = createEffect(() =>
  //   this.actions$.pipe(
  //     tap((action) => console.log(action)),
  //     ofType(MusicAPIActions.getLibraryPlaylists),
  //     map(async () => await this.musickit.getLibraryPlaylists()),
  //     switchMap(async (items) => fromMusickit(await items)),
  //     switchMap((value) => {
  //       if (!value) throw new Error('Value is not mappable to a type.');
  //       return of();
  //     }),
  //     switchMap((item) =>
  //       of(MusicAPIActions.getLibraryPlaylistsSuccess({ payload: item }))
  //     ),
  //     catchError((error: Error) => {
  //       tap(() => console.error(error));
  //       return of(
  //         MusicAPIActions.getLibraryPlaylistsFailure({ payload: { error } })
  //       );
  //     })
  //   )
  // );

  // getLibraryPlaylistSongs$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MusicAPIActions.getLibraryPlaylistSongs),
  //     switchMap(async (action) => {
  //       const result = this.musickit.getLibraryPlaylistSongs(action.payload.id);
  //       const converted = fromMusickit(await result);
  //       return converted;
  //     }),
  //     switchMap((songs: LibrarySong[]) =>
  //       of(
  //         MusicAPIActions.getLibraryPlaylistSongsSuccess({
  //           payload: { songs: songs },
  //         })
  //       )
  //     ),
  //     catchError((error) => {
  //       console.error('Error', error);
  //       return of(
  //         MusicAPIActions.getLibraryPlaylistSongsFailure({ payload: { error } })
  //       );
  //     })
  //   )
  // );
}
