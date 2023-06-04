import { inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { MusicAPIActions, MusicAPIState } from '@nyan-inc/shared';
import { switchMap, of, tap } from 'rxjs';
import { LayoutActions } from '../actions';
import { LayoutState } from '../reducers/layout.reducer';

export const setView$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store<LayoutState>)) =>
    actions$.pipe(
      ofType(LayoutActions.setView),
      switchMap(({ payload: { view } }) => {
        switch (view) {
          case 'songs': {
            store.dispatch(LayoutActions.setSongsView());
            return of(LayoutActions.setSongsView());
          }
          case 'albums': {
            store.dispatch(LayoutActions.setAlbumsView());
            return of(LayoutActions.setAlbumsView());
          }
          case 'artists': {
            store.dispatch(LayoutActions.setArtistsView());
            return of(LayoutActions.setArtistsView());
          }
          case 'playlists': {
            store.dispatch(LayoutActions.setPlaylistsView());
            return of(LayoutActions.setPlaylistsView());
          }

          default: {
            return of(LayoutActions.setSongsView());
          }
        }
      })
    ),
  { functional: true }
);

// export const setSongsView$ = createEffect(
//     (actions$ = inject(Actions), store = inject(Store<MusicAPIState>)) =>
//     // get library playlists
//     actions$.pipe(
//         ofType(LayoutActions.setSongsView),
//         take(1),
//         switchMap(() => {
//             return of(LayoutActions.getSongs());
//         }
//         )
//     ),
//     { functional: true }
// );

// export const setAlbumsView$ = createEffect(
//     (actions$ = inject(Actions), store = inject(Store<MusicAPIState>)) =>
//     // get library playlists
//     actions$.pipe(
//         ofType(LayoutActions.setAlbumsView),
//         take(1),
//         switchMap(() => {
//             return of(LayoutActions.getAlbums());
//         }
//         )
//     ),
//     { functional: true }
// );

// export const setArtistsView$ = createEffect(
//     (actions$ = inject(Actions), store = inject(Store<MusicAPIState>)) =>
//     // get library playlists
//     actions$.pipe(
//         ofType(LayoutActions.setArtistsView),
//         take(1),
//         switchMap(() => {
//             return of(LayoutActions.getArtists());
//         }
//         )
//     ),
//     { functional: true }
// );

export const setPlaylistsView$ = createEffect(
  (actions$ = inject(Actions), store = inject(Store<MusicAPIState>)) =>
    // get library playlists
    actions$.pipe(
      tap((action) => console.log(action)),
      ofType(LayoutActions.setPlaylistsView),
      switchMap(() => {
        store.dispatch(MusicAPIActions.getLibraryPlaylists());
        return of(LayoutActions.setPlaylistsViewSuccess());
      })
    ),
  { functional: true }
);
