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
  zip,
  tap,
  take,
} from 'rxjs';
import { of } from 'rxjs';
import { MusicAPIActions } from '../actions';
import copy from 'fast-copy';
import { select, Store } from '@ngrx/store';
import { ROUTER_NAVIGATED } from '@ngrx/router-store';
import { MusickitAPI } from '@yan-inc/core-services';
import {
  LibraryPlaylists,
  Resource,
  MediaItemTypes,
  LibrarySongs,
  PersonalRecommendation,
  MediaItem,
  Songs,
} from '@nyan-inc/core';

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
      filter((musickit) => musickit.instance !== null),
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
      switchMap(([action, libraryPlaylists]: [any, LibraryPlaylists[]]) => {
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
            switchMap((playlists: LibraryPlaylists[]) =>
              forkJoin(
                playlists.map((playlist) =>
                  from(this.musickit.getLibraryPlaylistSongs(playlist.id)).pipe(
                    map((songs: Songs[]) => ({
                      ...playlist,
                      attributes: {
                        ...playlist.attributes,
                        name: playlist.attributes?.name || '',
                        lastModifiedDate:
                          playlist.attributes?.lastModifiedDate || '',
                        canEdit: playlist.attributes?.canEdit || false,
                        dateCreated: playlist.attributes?.dateCreated || '',
                        hasCatalog: playlist.attributes?.hasCatalog || false,
                        isPublic: playlist.attributes?.isPublic || false,
                        isPublished: playlist.attributes?.isPublished || false,
                        playParams: playlist.attributes?.playParams || {
                          id: '',
                          kind: 'playlist',
                        },
                        url: playlist.attributes?.url || '',
                        durationInMillis:
                          playlist.attributes?.durationInMillis || 0,
                        artwork: {
                          ...playlist.attributes?.artwork,
                          height: playlist.attributes?.artwork?.height || 0,
                          width: playlist.attributes?.artwork?.width || 0,
                          url: transformArtworkUrl(
                            playlist.attributes?.artwork?.url || ''
                          ),
                        },
                      },
                      songs: songs.map((song: Songs) => ({
                        ...song,
                        attributes: {
                          ...(song?.attributes ?? {}),
                          artwork: {
                            ...song.attributes?.artwork,
                            url: transformArtworkUrl(
                              song.attributes?.artwork?.url || ''
                            ),
                          },
                        },
                      })),
                    }))
                  )
                )
              )
            ),
            map((playlists) =>
              MusicAPIActions.getLibraryPlaylistsSuccess({
                payload: { data: copy(playlists) },
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
            type: params.type,
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

  // Fetches user recommendations and recently played
  // Fetches user recommendations and recently played
  getRecommendationsAndRecentlyPlayed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getRecommendationsAndRecentlyPlayed),
      switchMap((action) =>
        forkJoin([
          this.musickit.getRecommendations(),
          this.musickit.getRecentlyPlayed(),
        ]).pipe(
          map(([recommendations, recentlyPlayed]) => {
            // Modify recommendations and recentlyPlayed arrays
            const modifiedRecommendations = recommendations.map(
              (item: PersonalRecommendation) => ({
                ...item,
                relationships: {
                  ...item.relationships,
                  contents: {
                    ...item.relationships?.contents,
                    data: item.relationships?.contents?.data?.map(
                      (item: Resource) => ({
                        ...item,
                        attributes: {
                          ...item.attributes,
                          artwork: {
                            ...item.attributes?.artwork,
                            url: transformArtworkUrl(
                              item.attributes?.artwork?.url || ''
                            ),
                          },
                        },
                      })
                    ),
                  },
                },
              })
            );

            const modifiedRecentlyPlayed = recentlyPlayed.map(
              (item: Resource) => ({
                ...item,
                attributes: {
                  ...item.attributes,
                  artwork: {
                    ...item.attributes?.artwork,
                    url: item.attributes?.artwork?.url
                      .replace('{w}x{h}', '200x200')
                      .replace('{f}', 'webp'),
                  },
                },
              })
            );

            return MusicAPIActions.getRecommendationsAndRecentlyPlayedSuccess({
              payload: {
                data: {
                  recommendations: modifiedRecommendations,
                  recentlyPlayed: modifiedRecentlyPlayed,
                },
              },
            });
          }),
          catchError((error) =>
            of(
              MusicAPIActions.getRecommendationsAndRecentlyPlayedFailure({
                payload: { error },
              })
            )
          )
        )
      )
    )
  );

  // Fetches user recommendations
  getRecommendations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getRecommendations),
      switchMap((action) =>
        from(this.musickit.getRecommendations()).pipe(
          map((recommendations) =>
            MusicAPIActions.getRecommendationsSuccess({
              payload: { data: recommendations },
            })
          ),
          catchError((error) =>
            of(
              MusicAPIActions.getRecommendationsFailure({
                payload: { error },
              })
            )
          )
        )
      )
    )
  );

  // Fetches recently played
  getRecentlyPlayed$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getRecentlyPlayed),
      switchMap((action) =>
        from(this.musickit.getRecentlyPlayed()).pipe(
          map((recentlyPlayed) =>
            MusicAPIActions.getRecentlyPlayedSuccess({
              payload: { data: recentlyPlayed },
            })
          ),
          catchError((error) =>
            of(
              MusicAPIActions.getRecentlyPlayedFailure({
                payload: { error },
              })
            )
          )
        )
      )
    )
  );

  // Fetches media item based on the type and id
  // look in the media cache and library playlists
  // if not found, fetch from musickit api by url and then add to cache
  getMediaItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MusicAPIActions.getMediaItem),
      withLatestFrom(
        this.store.pipe(select('musicApi', 'mediaCache')),
        this.store.pipe(select('musicApi', 'libraryPlaylists'))
      ),
      switchMap(([action, mediaCache, libraryPlaylists]: any) => {
        const { type, id } = action.payload;
        const foundInCache = mediaCache?.find(
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
              map((data) => {
                const [firstItem] = data;

                if (firstItem && firstItem.attributes?.artwork?.url) {
                  firstItem.attributes.artwork.url =
                    firstItem.attributes?.artwork.url
                      .replace('{w}x{h}', '200x200')
                      .replace('{f}', 'webp');
                }

                console.log(firstItem.relationships.tracks.data);
                if (firstItem && firstItem?.relationships?.tracks) {
                  firstItem?.relationships?.tracks.data?.forEach(
                    (track: any) => {
                      if (track.attributes?.artwork?.url) {
                        track.attributes.artwork.url =
                          track.attributes?.artwork.url
                            .replace('{w}x{h}', '200x200')
                            .replace('{f}', 'webp');
                      }
                    }
                  );
                }

                return MusicAPIActions.getMediaItemSuccess({
                  payload: { data: copy(firstItem) },
                });
              }),
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
          map((songs: LibrarySongs[]) => {
            const updatedSongs = songs.map((song) => ({
              ...song,
              attributes: {
                ...song.attributes,
                name: song.attributes?.name || '',
                artistName: song.attributes?.artistName || '',
                trackNumber: song.attributes?.trackNumber || 0,
                discNumber: song.attributes?.discNumber || 0,
                durationInMillis: song.attributes?.durationInMillis || 0,
                genreNames: song.attributes?.genreNames || [],
                hasLyrics: song.attributes?.hasLyrics || false,
                url: song.attributes?.url || '',
                isSingle: song.attributes?.isSingle || false,
                isMasteredForItunes:
                  song.attributes?.isMasteredForItunes || false,
                playParams: {
                  ...song.attributes?.playParams,
                  id: song.attributes?.playParams.id || '',
                  kind: song.attributes?.playParams.kind || 'song',
                },
                artwork: {
                  ...song.attributes?.artwork,
                  height: song.attributes?.artwork.height || 0,
                  width: song.attributes?.artwork.width || 0,
                  url: transformArtworkUrl(song.attributes?.artwork?.url || ''),
                },
              },
            }));

            return MusicAPIActions.getLibraryPlaylistSongsSuccess({
              payload: {
                playlist: action.payload.playlist,
                songs: updatedSongs,
              },
            });
          }),
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
  type: MediaItemTypes;
}

const transformArtworkUrl = (url: string) => {
  return url.replace('{w}x{h}', '200x200').replace('{f}', 'webp');
};
