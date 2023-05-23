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

  // Fetches a library playlist if it's not in the store
  getLibraryPlaylist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getLibraryPlaylist),
      switchMap((action: { payload: { playlistId: string } }) =>
        from(this.musickit.getLibraryPlaylist(action.payload.playlistId)).pipe(
          map((result: any | any[] | undefined) => result)
        )
      ),
      map(fromMusickit),
      map((playlist) =>
        MusicAPIActions.getLibraryPlaylistSuccess({
          payload: { data: copy(playlist[0]) },
        })
      ),
      catchError((error) =>
        of(MusicAPIActions.getLibraryPlaylistFailure({ payload: { error } }))
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
  // Fetches media item based on the type and id
  getMediaItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getMediaItem),
      switchMap(
        (
          action: TypedAction<string> & {
            payload: { type: MediaTypes; id: string };
          }
        ) =>
          from(this.musickit.findByUrl(action.payload.type, action.payload.id))
      ),
      mergeMap(fromMusickit),
      mergeMap((mediaItem) =>
        from(this.colorService.getAverageColor(mediaItem.artwork.url!)).pipe(
          map((averageColor) => ({
            ...mediaItem,
            artwork: {
              ...mediaItem.artwork,
              dominantColor: averageColor?.hex!,
            },
          }))
        )
      ),
      map((mediaItem) =>
        MusicAPIActions.getMediaItemSuccess({
          payload: { data: copy(mediaItem) },
        })
      ),
      map((action) => {
        const mediaItem = action.payload.data;
        return MusicAPIActions.setCurrentMedia({
          payload: { data: copy(mediaItem) },
        });
      }),
      catchError((error) =>
        of(MusicAPIActions.getMediaItemFailure({ payload: { error } }))
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
