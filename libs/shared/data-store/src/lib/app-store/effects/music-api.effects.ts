import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import {
  switchMap,
  catchError,
  map,
  filter,
  mergeMap,
  from,
  tap,
  forkJoin,
  take,
} from 'rxjs';
import { of } from 'rxjs';
import { MusicAPIActions } from '../actions';
import {
  fromMusickit,
  ColorService,
  adjustColor,
  MediaTypes,
} from '@nyan-inc/core';
import { MusickitAPI } from '@yan-inc/core-services';
import copy from 'fast-copy';
import { Store } from '@ngrx/store';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { TypedAction } from '@ngrx/store/src/models';

@Injectable({ providedIn: 'root' })
export class MusicAPIEffects {
  private store = inject(Store);
  private actions$ = inject(Actions);
  private musickit = inject(MusickitAPI);
  private colorService = inject(ColorService);

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

  // Fetches library playlists if they're not in the store
  getLibraryPlaylists$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylists),
      mergeMap((action) =>
        from(this.musickit.getLibraryPlaylists()).pipe(
          mergeMap((playlists) =>
            forkJoin(
              playlists.map(
                (playlist) =>
                  from(this.musickit.getLibraryPlaylistSongs(playlist.id)).pipe(
                    map((songs) => ({ ...playlist, songs }))
                  ),
                tap((value) => console.log(value))
              )
            )
          )
        )
      ),
      map((value) => fromMusickit(value)),
      tap((value) => console.log(value)),
      map((playlists) =>
        MusicAPIActions.getLibraryPlaylistsSuccess({
          payload: { data: copy(playlists) },
        })
      ),
      catchError((error) =>
        of(MusicAPIActions.getLibraryPlaylistsFailure({ payload: { error } }))
      )
    )
  );

  // // Checks if the playlists have songs and if not, fetches songs from Musickit API
  // private checkAndFetchSongsForPlaylists = (playlists: LibraryPlaylist[]) => {
  //   const playlistsWithSongProperty = playlists.filter(
  //     (playlist) => playlist.tracks && playlist.tracks.length
  //   );

  //   if (!playlistsWithSongProperty.length) {
  //     this.store.dispatch(
  //       MusicAPIActions.getLibraryPlaylistSongs({ payload: { playlist: playlist } })
  //     );
  //   }
  // };

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
  // look in the media cache and libvrary playlists
  // if not found, fetch from musickit api
  getMediaItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getMediaItem),
      mergeMap((action) =>
        this.store.select('mediaCache').pipe(
          take(1),
          map((mediaCache) => {
            const mediaItem = mediaCache[action.payload.id];

            if (mediaItem) {
              return MusicAPIActions.getMediaItemSuccess({
                payload: { data: copy(mediaItem) },
              });
            }

            return MusicAPIActions.getLibraryPlaylist({
              payload: { playlistId: action.payload.id },
            });
          })
        )
      )
    )
  );

  // Fetches songs for given library playlist
  getLibraryPlaylistSongs$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylistSongs),
      switchMap((action) =>
        this.musickit.getLibraryPlaylistSongs(action.payload.playlist.id)
      ),
      map(fromMusickit),
      map((songs) =>
        MusicAPIActions.getLibraryPlaylistSongsSuccess({
          payload: { playlist: copy(songs[0]) },
        })
      ),
      catchError((error) =>
        of(
          MusicAPIActions.getLibraryPlaylistSongsFailure({ payload: { error } })
        )
      )
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
  getLibraryAlbum$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getLibraryAlbum),
      switchMap((action) =>
        this.musickit.getLibraryAlbum(action.payload.albumId)
      ),
      map(fromMusickit),
      map((album) =>
        MusicAPIActions.getLibraryAlbumSuccess({
          payload: { data: copy(album[0]) },
        })
      ),
      catchError((error) =>
        of(MusicAPIActions.getLibraryAlbumFailure({ payload: { error } }))
      )
    )
  );

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

interface RouteParams {
  id: string;
  type: MediaTypes;
}
