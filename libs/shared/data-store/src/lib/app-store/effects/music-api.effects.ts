import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  map,
  filter,
  mergeMap,
  from,
  withLatestFrom,
  forkJoin,
  concatMap,
} from 'rxjs';
import { of } from 'rxjs';
import { MusicAPIActions } from '../actions';
import {
  fromMusickit,
  MediaTypes,
  LibraryPlaylist,
  LibrarySong,
} from '@nyan-inc/core';
import copy from 'fast-copy';
import { select, Store } from '@ngrx/store';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { MusickitAPI } from '@yan-inc/core-services';

@Injectable({ providedIn: 'root' })
export class MusicAPIEffects {
  private store = inject(Store<MusickitAPI>);
  private actions$ = inject(Actions);
  private musickit = inject(MusickitAPI);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.init),
      switchMap((action) =>
        this.musickit.initMusicKit(action.payload.config.developerToken)
      ),
      mergeMap(() => [
        MusicAPIActions.initSuccess(),
        MusicAPIActions.getLibraryPlaylists(),
      ]),
      catchError((error) =>
        of(MusicAPIActions.initFailure({ payload: { error } }))
      )
    )
  );

  // Checks the store for library playlists and if they're not there, fetches them from Musickit API
  getLibraryPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylists),
      withLatestFrom(this.store.pipe(select('libraryPlaylists'))),
      switchMap(([action, libraryPlaylists]: [any, LibraryPlaylist[]]) => {
        if (libraryPlaylists && libraryPlaylists.length !== 0) {
          console.log('library playlists already in store');
          return of(
            MusicAPIActions.getLibraryPlaylistsSuccess({
              payload: { data: libraryPlaylists },
            })
          );
        } else {
          // get library playlists and then songs
          return from(this.musickit.getLibraryPlaylists()).pipe(
            switchMap((playlists: LibraryPlaylist[]) =>
              forkJoin(
                playlists.map((playlist) =>
                  from(this.musickit.getLibraryPlaylistSongs(playlist.id)).pipe(
                    map(fromMusickit),
                    map((songs) => ({
                      ...playlist,
                      songs,
                    }))
                  )
                )
              )
            ),
            map(fromMusickit),
            map((playlists) =>
              MusicAPIActions.getLibraryPlaylistsSuccess({
                payload: { data: playlists },
              })
            ),
            catchError((error) =>
              of(
                MusicAPIActions.getLibraryPlaylistsFailure({
                  payload: { error },
                })
              )
            )
          );
        }
      }),
      catchError((error) =>
        of(MusicAPIActions.getLibraryPlaylistsFailure({ payload: { error } }))
      )
    )
  );

  // // Fetches library albums if they're not in the store
  // getLibraryAlbums$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MusicAPIActions.getLibraryAlbum),
  //     withLatestFrom(this.store.select('libraryAlbums')),
  //     filter(
  //       ([action, libraryAlbums]) =>
  //         !libraryAlbums || libraryAlbums.length === 0
  //     ),
  //     switchMap(
  //       ([action, libraryAlbums]) =>
  //         libraryAlbums ?? this.musickit.getLibraryAlbums()
  //     ),
  //     map(fromMusickit),
  //     map((albums) =>
  //       MusicAPIActions.getLibraryAlbumsSuccess({
  //         payload: { data: copy(albums) },
  //       })
  //     ),
  //     catchError((error) =>
  //       of(MusicAPIActions.getLibraryAlbumsFailure({ error }))
  //     )
  //   )
  // );

  // Fetches media item based on the route params
  getMediaItemOnRouteChange$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROUTER_NAVIGATED),
      map((router) => router.payload?.routerState?.root?.firstChild?.params),
      filter((params: RouteParams) => !!params.id && !!params.type),
      mergeMap((params: RouteParams) => [
        MusicAPIActions.getMediaItem({
          payload: {
            type: params.type as MediaTypes,
            id: params.id,
          },
        }),
        MusicAPIActions.setCurrentViewType({
          payload: { type: params.type, id: params.id },
        }),
      ]),
      catchError((error) =>
        of(MusicAPIActions.getMediaItemFailure({ payload: { error } }))
      )
    )
  );

  // Fetches media item based on the type and id
  // look in the media cache and library playlists
  // if not found, fetch from musickit api by url
  getMediaItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getMediaItem),
      withLatestFrom(
        this.store.pipe(select('musicApi', 'mediaCache')),
        this.store.pipe(select('musicApi', 'libraryPlaylists'))
      ),
      switchMap(([action, mediaCache, libraryPlaylists]: any) => {
        const { type, id } = action.payload;
        const foundInCache = mediaCache?.[type]?.find(
          (item: any) => item.id === action.payload.id
        );

        if (foundInCache) {
          console.log('Found in cache');
          return of(
            MusicAPIActions.getMediaItemSuccess({
              payload: { data: copy(foundInCache) },
            }),
            MusicAPIActions.setCurrentMedia({ payload: { data: foundInCache } })
          );
        } else {
          const foundInLibrary = libraryPlaylists?.find(
            (playlist: any) => playlist.id === id
          );

          if (foundInLibrary) {
            console.log('Found in library playlists');
            return of(
              MusicAPIActions.getMediaItemSuccess({
                payload: { data: copy(foundInLibrary) },
              }),
              MusicAPIActions.setCurrentMedia({
                payload: { data: foundInLibrary },
              })
            );
          } else {
            console.log("Didn't find in cache or library");
            return from(this.musickit.findByUrl(type, id)).pipe(
              map((item) => fromMusickit(item)),
              map((data) =>
                MusicAPIActions.getMediaItemSuccess({
                  payload: { data: copy(data[0]) },
                })
              ),
              concatMap((data) =>
                of(
                  data,
                  MusicAPIActions.setCurrentMedia({
                    payload: { data: data.payload.data },
                  })
                )
              ),
              catchError((error) =>
                of(MusicAPIActions.getMediaItemFailure({ payload: { error } }))
              )
            );
          }
        }
      })
    )
  );

  // sets the current media item and returns it
  setCurrentMedia$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.setCurrentMedia),
      map((action) => action.payload),
      map((payload) => MusicAPIActions.setCurrentMediaSuccess()),
      catchError((error) =>
        of(MusicAPIActions.setCurrentMediaFailure({ payload: { error } }))
      )
    )
  );

  // Fetches songs for given library playlist
  getLibraryPlaylistSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylistSongs),
      switchMap((action) => {
        return from(
          this.musickit.getLibraryPlaylistSongs(action.payload.playlist.id)
        ).pipe(
          map((songs: LibrarySong[]) =>
            MusicAPIActions.getLibraryPlaylistSongsSuccess({
              payload: {
                playlist: action.payload.playlist,
                songs,
              },
            })
          ),
          catchError((error) =>
            of(
              MusicAPIActions.getLibraryPlaylistSongsFailure({
                payload: { error },
              })
            )
          )
        );
      })
    )
  );

  // // Fetches songs for given library albums
  // getLibraryAlbumSongs$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MusicAPIActions.getLibraryAlbumSongs),
  //     switchMap((action) =>
  //       this.musickit.getLibraryAlbumSongs(action.payload.albums)
  //     ),
  //     map(fromMusickit),
  //     map((songs) =>
  //       MusicAPIActions.getLibraryAlbumSongsSuccess({
  //         payload: { data: copy(songs) },
  //       })
  //     ),
  //     catchError((error) =>
  //       of(MusicAPIActions.getLibraryAlbumSongsFailure({ payload: { error } }))
  //     )
  //   )
  // );

  // Fetches library album
  // getLibraryAlbum$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(MusicAPIActions.getLibraryAlbum),
  //     switchMap((action) =>
  //       this.musickit.getLibraryAlbum(action.payload.albumId)
  //     ),
  //     map(fromMusickit),
  //     map((album) =>
  //       MusicAPIActions.getLibraryAlbumSuccess({
  //         payload: { data: copy(album[0]) },
  //       })
  //     ),
  //     catchError((error) =>
  //       of(MusicAPIActions.getLibraryAlbumFailure({ payload: { error } }))
  //     )
  //   )
  // );

  // sets the current media type
  setCurrentViewType$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.setCurrentViewType),
      map((action) =>
        MusicAPIActions.setCurrentViewTypeSuccess({
          payload: {
            type: copy(action.payload.type),
            id: copy(action.payload.id),
          },
        })
      ),
      catchError((error) =>
        of(MusicAPIActions.setCurrentViewTypeFailure({ payload: { error } }))
      )
    )
  );
}

// utility functions

interface RouteParams {
  id: string;
  type: MediaTypes;
}
